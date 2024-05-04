import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Product } from '@modules/products/entities/product.entity';
import { Module } from '@nestjs/common';

import { Order } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
    imports: [MikroOrmModule.forFeature({ entities: [Order, Product] })],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}
