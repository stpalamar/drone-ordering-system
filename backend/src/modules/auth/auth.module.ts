import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EmailModule } from '@modules/email/email.module';
import { EmailService } from '@modules/email/email.service';
import { PublicFile } from '@modules/files/entities/public-file.entity';
import { Role } from '@modules/permission/entities/role.entity';
import { User } from '@modules/users/entities/user.entity';
import { UserDetails } from '@modules/users/entities/user-details.entity';
import { UsersModule } from '@modules/users/users.module';
import { UsersService } from '@modules/users/users.service';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        ConfigModule,
        UsersModule,
        PassportModule,
        EmailModule,
        MikroOrmModule.forFeature([User, Role, UserDetails, PublicFile]),
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
    providers: [AuthService, JwtStrategy, UsersService, EmailService],
})
export class AuthModule {}
