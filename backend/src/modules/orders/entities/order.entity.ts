import { BaseEntity } from '@common/database/base.entity';
import { WithSoftDelete } from '@common/database/filters/filters';
import { ValueOf } from '@common/types/types';
import {
    Collection,
    Entity,
    Enum,
    Index,
    OneToMany,
    Property,
    UuidType,
} from '@mikro-orm/postgresql';

import { OrderStatus } from '../enums/enums';
import { OrderItem } from './order-item.entity';

@Entity()
@WithSoftDelete()
class Order extends BaseEntity {
    @Property({
        type: 'uuid',
        unique: true,
    })
    orderNumber!: UuidType;

    @Property()
    firstName!: string;

    @Property()
    lastName!: string;

    @Property()
    phone!: string;

    @Property()
    email!: string;

    @Enum({
        items: () => OrderStatus,
        nativeEnumName: 'order_status',
    })
    status: ValueOf<typeof OrderStatus>;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    items = new Collection<OrderItem>(this);

    @Index()
    @Property({ nullable: true, type: 'timestamptz' })
    deletedAt?: Date;

    toObject() {
        return {
            id: this.id,
            orderNumber: String(this.orderNumber),
            firstName: this.firstName,
            lastName: this.lastName,
            phone: this.phone,
            email: this.email,
            items: this.items.getItems().map((item) => item.toObject()),
            status: this.status,
            createdAt: this.createdAt,
        };
    }
}

export { Order };
