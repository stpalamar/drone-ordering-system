import { HelperService } from '@common/helpers/helpers';
import { ValueOf } from '@common/types/types';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';
import { EmailService } from '@modules/email/email.service';
import { Role } from '@modules/permission/entities/role.entity';
import { User } from '@modules/users/entities/user.entity';
import { UserDetails } from '@modules/users/entities/user-details.entity';
import { UserRole } from '@modules/users/enums/enums';
import {
    type UserResponseDto,
    type UserSignInRequestDto,
} from '@modules/users/types/types';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ManagerSignUpRequestDto, UserConfirmEmailRequestDto } from 'shared';

import { AuthTokenPayload, ConfirmTokenPayload } from './types/types';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: EntityRepository<User>,
        @InjectRepository(Role)
        private readonly roleRepository: EntityRepository<Role>,
        @InjectRepository(UserDetails)
        private readonly userDetailsRepository: EntityRepository<UserDetails>,
        private readonly em: EntityManager,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly emailService: EmailService,
    ) {}

    private async validateUser(
        userSignInRequestDto: UserSignInRequestDto,
    ): Promise<User> {
        const user = await this.usersRepository.findOne({
            email: userSignInRequestDto.email,
        });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        const isValid = HelperService.verifyHash(
            userSignInRequestDto.password,
            user.password,
        );

        if (!isValid) {
            throw new HttpException(
                'Invalid password',
                HttpStatus.UNAUTHORIZED,
            );
        }

        return user;
    }

    public async getCookieWithJwtToken(userId: number) {
        const payload: AuthTokenPayload = { userId };
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
            'JWT_EXPIRATION_TIME',
        )}`;
    }

    public getCookieForLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }

    public async signIn(
        userSignInRequestDto: UserSignInRequestDto,
    ): Promise<UserResponseDto> {
        const user = await this.validateUser(userSignInRequestDto);

        if (!user.isEmailConfirmed) {
            throw new HttpException(
                'Email is not confirmed',
                HttpStatus.FORBIDDEN,
            );
        }

        return (
            await wrap(user).populate([
                'role',
                'role.permissions',
                'role.permissions.subject',
                'details',
            ])
        ).toObject();
    }

    public async signUp(
        userSignUpRequestDto: UserSignInRequestDto,
        userRole: ValueOf<typeof UserRole>,
    ): Promise<UserResponseDto> {
        const user = await this.usersRepository.findOne({
            email: userSignUpRequestDto.email,
        });
        if (user) {
            throw new HttpException(
                'Email already exists',
                HttpStatus.BAD_REQUEST,
            );
        }
        const role = await this.roleRepository.findOne({ name: userRole });
        const newUser = this.usersRepository.create({
            ...userSignUpRequestDto,
            role: role,
        });
        await this.em.persistAndFlush(newUser);
        return (
            await wrap(newUser).populate([
                'role',
                'role.permissions',
                'role.permissions.subject',
                'details',
            ])
        ).toObject();
    }

    public async signUpManager(
        managerSignUpRequestDto: ManagerSignUpRequestDto,
        origin: string,
    ) {
        const { token, ...userSignUp } = managerSignUpRequestDto;

        const isValidToken = this.jwtService.verify(token);

        if (!isValidToken) {
            throw new HttpException('Token is invalid', HttpStatus.BAD_REQUEST);
        }

        const newUser = await this.signUp(userSignUp, UserRole.MANAGER);

        const confirmationToken = this.jwtService.sign(
            {
                email: newUser.email,
            },
            { expiresIn: '10m' },
        );

        const confirmationUrl = `${origin}/confirm-email?token=${confirmationToken}`;

        await this.emailService.sendManagerConfirmationEmail(
            newUser.email,
            confirmationUrl,
        );
    }

    public async confirmEmail(
        userConfirmEmailRequestDto: UserConfirmEmailRequestDto,
    ) {
        const { token, userDetails } = userConfirmEmailRequestDto;

        try {
            const payload = this.jwtService.verify<ConfirmTokenPayload>(token);
            if (!payload) {
                throw new HttpException(
                    'Token is invalid',
                    HttpStatus.BAD_REQUEST,
                );
            }

            const user = await this.usersRepository.findOne({
                email: payload.email,
            });

            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }

            const details = this.userDetailsRepository.create({
                ...userDetails,
            });

            user.isEmailConfirmed = true;
            user.details = details;

            await this.em.persistAndFlush(user);
            return (
                await wrap(user).populate([
                    'role',
                    'role.permissions',
                    'role.permissions.subject',
                    'details',
                ])
            ).toObject();
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException(
                    'Token is invalid',
                    HttpStatus.BAD_REQUEST,
                );
            }
        }
    }
}
