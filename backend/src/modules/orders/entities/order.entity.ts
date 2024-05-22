import { BaseEntity } from '@common/database/base.entity';
import { WithSoftDelete } from '@common/database/filters/filters';
import { ValueOf } from '@common/types/types';
import {
    Collection,
    Entity,
    Enum,
    Index,
    ManyToOne,
    OneToMany,
    OneToOne,
    Property,
    UuidType,
} from '@mikro-orm/postgresql';
import { Chat } from '@modules/chats/entities/chat.entity';
import { User } from '@modules/users/entities/user.entity';

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

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
        orphanRemoval: true,
    })
    items = new Collection<OrderItem>(this);

    @ManyToOne(() => User, { nullable: true })
    manager!: User;

    @ManyToOne(() => User, { nullable: true })
    customer!: User;

    @Property({ type: 'int' })
    totalPrice!: number;

    @OneToOne(() => Chat, (chat) => chat.order, { owner: true, nullable: true })
    chat!: Chat;

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
            manager: this.manager ? this.manager.toObject() : null,
            customer: this.customer ? this.customer.toObject() : null,
            status: this.status,
            totalPrice: this.totalPrice,
            chatId: this.chat ? this.chat.id : null,
            createdAt: this.createdAt.toISOString(),
        };
    }
}

export { Order };
