import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());

    app.setGlobalPrefix('api');

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });

    await app.listen(3001);
}
bootstrap();
