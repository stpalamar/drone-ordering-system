import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';
import { User } from '@modules/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { MessageRequestDto } from 'shared';

import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';

@Injectable()
export class ChatsService {
    constructor(
        @InjectRepository(Chat)
        private readonly chatsRepository: EntityRepository<Chat>,
        @InjectRepository(Message)
        private readonly messagesRepository: EntityRepository<Message>,
        private readonly em: EntityManager,
    ) {}

    async findOne(id: number) {
        const chat = await this.chatsRepository.findOne(
            { id },
            {
                populate: [
                    'messages',
                    'messages.sender',
                    'users',
                    'users.details',
                    'users.details.avatar',
                    'order',
                ],
            },
        );
        return chat.toObject();
    }

    async createMessage(message: MessageRequestDto, user: User) {
        const chat = await this.chatsRepository.findOne({ id: message.chatId });

        if (!chat) {
            throw new Error('Chat not found');
        }

        const createdMessage = this.messagesRepository.create({
            chat: chat,
            sender: user,
            text: message.text,
        });

        await this.em.persistAndFlush(createdMessage);
        wrap(createdMessage).populate([
            'sender',
            'sender.details',
            'sender.details.avatar',
            'chat',
        ]);

        return createdMessage.toObject();
    }
}
