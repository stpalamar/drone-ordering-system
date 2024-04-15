import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
    type UserSignInRequestDto,
    type UserDto,
} from '@modules/users/types/types';
import { InjectRepository } from '@mikro-orm/nestjs';
import User from '@modules/users/user.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { HelperService } from '@common/helpers/helpers';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './types/token-payload.type';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: EntityRepository<User>,
        private readonly em: EntityManager,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    private async validateUser(
        userSignInRequestDto: UserSignInRequestDto,
    ): Promise<UserDto> {
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
    ): Promise<UserDto> {
        const user = await this.validateUser(userSignInRequestDto);
        return user;
    }

    public async signUp(
        userSignUpRequestDto: UserSignInRequestDto,
    ): Promise<UserDto> {
        const user = await this.usersRepository.findOne({
            email: userSignUpRequestDto.email,
        });
        if (user) {
            throw new HttpException(
                'User already exists',
                HttpStatus.BAD_REQUEST,
            );
        }
        const newUser = this.usersRepository.create(userSignUpRequestDto);
        await this.em.flush();

        return newUser;
    }
}
