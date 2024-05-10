import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PublicFile } from '@modules/files/entities/public-file.entity';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [
        ConfigModule,
        MikroOrmModule.forFeature([User, PublicFile]),
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
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
