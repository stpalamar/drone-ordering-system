import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@modules/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import User from '@modules/users/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersService } from '@modules/users/users.service';

@Module({
    imports: [
        ConfigModule,
        UsersModule,
        PassportModule,
        MikroOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}`,
                },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, UsersService],
})
export class AuthModule {}
