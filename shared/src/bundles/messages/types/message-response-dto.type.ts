import { type ChatUserResponseDto } from '../../chats/chats.js';

type MessageResponseDto = {
    id: number;
    chatId: number;
    sender: ChatUserResponseDto;
    text: string;
    createdAt: string;
};

export { type MessageResponseDto };
