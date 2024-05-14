import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PublicFile } from '@modules/files/entities/public-file.entity';
import { Product } from '@modules/products/entities/product.entity';
import { User } from '@modules/users/entities/user.entity';
import { UsersModule } from '@modules/users/users.module';
import { UsersService } from '@modules/users/users.service';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { Order } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
    imports: [
        ConfigModule,
        MikroOrmModule.forFeature({
            entities: [Order, Product, User, PublicFile],
        }),
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
        UsersModule,
    ],
    controllers: [OrdersController],
    providers: [OrdersService, UsersService],
})
export class OrdersModule {}
