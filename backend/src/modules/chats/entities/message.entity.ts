import { BaseEntity } from '@common/database/base.entity';
import { Entity, ManyToOne, Property } from '@mikro-orm/postgresql';
import { User } from '@modules/users/entities/user.entity';

import { Chat } from './chat.entity';

@Entity()
class Message extends BaseEntity {
    @ManyToOne(() => Chat)
    chat!: Chat;

    @ManyToOne(() => User)
    sender!: User;

    @Property({ type: 'text' })
    text!: string;

    toObject() {
        return {
            id: this.id,
            chat: this.chat.id,
            sender: {
                id: this.sender.id,
                email: this.sender.email,
                firstName: this.sender.details.firstName,
                lastName: this.sender.details.lastName,
                avatarUrl: this.sender.details.avatar
                    ? this.sender.details.avatar.url
                    : null,
            },
            text: this.text,
            createdAt: this.createdAt.toISOString(),
        };
    }
}

export { Message };
