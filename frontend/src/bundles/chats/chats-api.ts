import { ApiPath } from '~/bundles/common/enums/enums.js';
import { baseApi } from '~/framework/base-api/base-api.js';
import {
    SocketEvent,
    SocketNamespace,
} from '~/framework/socket/enums/enums.js';
import { socket } from '~/framework/socket/socket.js';

import { type ChatResponseDto, type MessageRequestDto } from './types/types.js';

const chatSocketInstance = socket.getInstance(SocketNamespace.CHAT);

const chatsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getChat: build.query<ChatResponseDto, number>({
            query: (id) => ({
                url: `${ApiPath.CHATS}/${id}`,
                method: 'GET',
            }),
            async onCacheEntryAdded(
                argument,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
            ) {
                chatSocketInstance.emit(SocketEvent.CHAT_JOIN_ROOM, {
                    chatId: argument,
                });

                try {
                    await cacheDataLoaded;

                    chatSocketInstance.on(
                        SocketEvent.CHAT_SEND_MESSAGE,
                        (data) => {
                            updateCachedData((draft) => {
                                draft.messages.push(data);
                            });
                        },
                    );
                } catch {
                    await cacheEntryRemoved;
                }

                await cacheEntryRemoved;

                chatSocketInstance.emit(SocketEvent.CHAT_LEAVE_ROOM, {
                    chatId: argument,
                });
            },
        }),
        sendMessage: build.mutation<void, MessageRequestDto>({
            query: (payload) => ({
                url: `${ApiPath.CHATS}/send-message`,
                method: 'POST',
                body: payload,
            }),
        }),
    }),
});

const { useGetChatQuery, useSendMessageMutation } = chatsApi;

export { chatsApi, useGetChatQuery, useSendMessageMutation };
