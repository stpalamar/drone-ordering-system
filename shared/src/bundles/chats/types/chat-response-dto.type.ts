import { type MessageResponseDto } from '../../messages/messages.js';
import { type ChatUserResponseDto } from './chat-user-response-dto.type.js';

type ChatResponseDto = {
    id: number;
    users: ChatUserResponseDto[];
    messages: MessageResponseDto[];
};

export { type ChatResponseDto };
