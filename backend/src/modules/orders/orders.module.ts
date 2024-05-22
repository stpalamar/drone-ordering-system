import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Chat } from '@modules/chats/entities/chat.entity';
import { PublicFile } from '@modules/files/entities/public-file.entity';
import { FilesModule } from '@modules/files/files.module';
import { FilesService } from '@modules/files/files.service';
import { PdfModule } from '@modules/pdf/pdf.module';
import { PdfService } from '@modules/pdf/pdf.service';
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
            entities: [Order, Product, User, PublicFile, Chat],
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
        FilesModule,
        PdfModule,
    ],
    controllers: [OrdersController],
    providers: [OrdersService, UsersService, PdfService, FilesService],
})
export class OrdersModule {}
