import { MikroOrmModule } from '@mikro-orm/nestjs';
import { FilesModule } from '@modules/files/files.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
    imports: [MikroOrmModule.forFeature([Product]), FilesModule, ConfigModule],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}
