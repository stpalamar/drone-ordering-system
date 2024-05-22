import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { ChatsController } from './chats.controller';
import { ChatsGateway } from './chats.gateway';
import { ChatsService } from './chats.service';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';

@Module({
    imports: [
        MikroOrmModule.forFeature({
            entities: [Chat, Message],
        }),
    ],
    controllers: [ChatsController],
    providers: [ChatsService, ChatsGateway],
})
export class ChatsModule {}
