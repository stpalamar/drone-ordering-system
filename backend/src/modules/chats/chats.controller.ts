import { RequestUser } from '@common/decorators/user.decorator';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { User } from '@modules/users/entities/user.entity';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MessageRequestDto } from 'shared';

import { ChatsGateway } from './chats.gateway';
import { ChatsService } from './chats.service';
import { SocketEvent } from './enums/enums';

@Controller('chats')
@UseGuards(JwtAuthGuard)
export class ChatsController {
    constructor(
        private readonly chatsService: ChatsService,
        private readonly chatsGateway: ChatsGateway,
    ) {}

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.chatsService.findOne(+id);
    }

    @Post('/send-message')
    async sendMessage(
        @Body() newMessage: MessageRequestDto,
        @RequestUser() user: User,
    ) {
        const message = await this.chatsService.createMessage(newMessage, user);
        this.chatsGateway.server.emit(SocketEvent.CHAT_SEND_MESSAGE, message);

        return message;
    }
}
