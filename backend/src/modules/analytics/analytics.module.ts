import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Order } from '@modules/orders/entities/order.entity';
import { Role } from '@modules/permission/entities/role.entity';
import { Product } from '@modules/products/entities/product.entity';
import { User } from '@modules/users/entities/user.entity';
import { Module } from '@nestjs/common';

import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

@Module({
    imports: [
        MikroOrmModule.forFeature({ entities: [Order, Product, User, Role] }),
    ],
    controllers: [AnalyticsController],
    providers: [AnalyticsService],
})
export class AnalyticsModule {}
