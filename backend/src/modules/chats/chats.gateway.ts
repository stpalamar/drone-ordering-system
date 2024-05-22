import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { SocketEvent, SocketNamespace } from './enums/enums';

@WebSocketGateway({ namespace: SocketNamespace.CHAT })
export class ChatsGateway {
    @WebSocketServer() server: Server = new Server();

    @SubscribeMessage(SocketEvent.CHAT_JOIN_ROOM)
    async handleJoinRoom(
        @MessageBody()
        data: {
            chatId: string;
        },
    ) {
        this.server.socketsJoin(data.chatId);
        this.server.to(data.chatId).emit(SocketEvent.CHAT_JOIN_ROOM, data);
    }

    @SubscribeMessage(SocketEvent.CHAT_LEAVE_ROOM)
    async handleLeaveRoom(
        @MessageBody()
        data: {
            chatId: string;
        },
    ) {
        this.server.socketsLeave(data.chatId);
        this.server.to(data.chatId).emit(SocketEvent.CHAT_LEAVE_ROOM, data);
    }
}
