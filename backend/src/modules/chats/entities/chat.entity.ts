import { BaseEntity } from '@common/database/base.entity';
import {
    Collection,
    Entity,
    ManyToMany,
    OneToMany,
    OneToOne,
} from '@mikro-orm/postgresql';
import { Order } from '@modules/orders/entities/order.entity';
import { User } from '@modules/users/entities/user.entity';

import { Message } from './message.entity';

@Entity()
class Chat extends BaseEntity {
    @ManyToMany(() => User)
    users = new Collection<User>(this);

    @OneToMany(() => Message, (message) => message.chat, {
        orphanRemoval: true,
    })
    messages = new Collection<Message>(this);

    @OneToOne(() => Order, (order) => order.chat, { orphanRemoval: true })
    order!: Order;

    toObject() {
        return {
            id: this.id,
            users: this.users.getItems().map((user) => ({
                id: user.id,
                email: user.email,
                firstName: user.details.firstName,
                lastName: user.details.lastName,
                avatarUrl: user.details.avatar ? user.details.avatar.url : null,
            })),
            messages: this.messages
                .getItems()
                .map((message) => message.toObject()),
        };
    }
}

export { Chat };
