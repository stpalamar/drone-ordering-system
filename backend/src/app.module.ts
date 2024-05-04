import { AuthModule } from '@modules/auth/auth.module';
import { FilesModule } from '@modules/files/files.module';
import { OrdersModule } from '@modules/orders/orders.module';
import { ProductsModule } from '@modules/products/products.module';
import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { PermissionModule } from './modules/permission/permission.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                DB_PORT: Joi.number().required(),
                DB_HOST: Joi.string().required(),
                DB_NAME: Joi.string().required(),
                DB_USERNAME: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRATION_TIME: Joi.string().required(),
                S3_ACCESS_KEY: Joi.string().required(),
                S3_SECRET_KEY: Joi.string().required(),
                S3_BUCKET_NAME: Joi.string().required(),
                S3_REGION: Joi.string().required(),
            }),
        }),
        DatabaseModule,
        UsersModule,
        AuthModule,
        PermissionModule,
        FilesModule,
        ProductsModule,
        OrdersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
