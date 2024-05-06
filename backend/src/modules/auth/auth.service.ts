import { HelperService } from '@common/helpers/helpers';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';
import { Role } from '@modules/permission/entities/role.entity';
import {
    type UserResponseDto,
    type UserSignInRequestDto,
} from '@modules/users/types/types';
import { User } from '@modules/users/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { TokenPayload } from './types/token-payload.type';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: EntityRepository<User>,
        @InjectRepository(Role)
        private readonly roleRepository: EntityRepository<Role>,
        private readonly em: EntityManager,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
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
        const payload: TokenPayload = { userId };
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

        return (
            await wrap(user).populate([
                'role',
                'role.permissions',
                'role.permissions.subject',
            ])
        ).toObject();
    }

    public async signUp(
        userSignUpRequestDto: UserSignInRequestDto,
    ): Promise<UserResponseDto> {
        const user = await this.usersRepository.findOne({
            email: userSignUpRequestDto.email,
        });
        if (user) {
            throw new HttpException(
                'User already exists',
                HttpStatus.BAD_REQUEST,
            );
        }
        const role = await this.roleRepository.findOne({ name: 'manager' });
        const newUser = this.usersRepository.create({
            ...userSignUpRequestDto,
            role: role,
        });
        await this.em.persistAndFlush(newUser);
        return (
            await wrap(newUser).populate(['role', 'role.permissions'])
        ).toObject();
    }
}
