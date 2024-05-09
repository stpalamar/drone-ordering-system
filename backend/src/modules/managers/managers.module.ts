import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Role } from '@modules/permission/entities/role.entity';
import { User } from '@modules/users/entities/user.entity';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { ManagersController } from './managers.controller';
import { ManagersService } from './managers.service';

@Module({
    imports: [
        MikroOrmModule.forFeature([User, Role]),
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
    controllers: [ManagersController],
    providers: [ManagersService],
})
export class ManagersModule {}
