import {
    useGetChatQuery,
    useSendMessageMutation,
} from '~/bundles/chats/chats-api.js';
import { ChatList, ChatTopbar } from '~/bundles/chats/components/components.js';
import {
    type ChatUserResponseDto,
    type MessageRequestDto,
} from '~/bundles/chats/types/types.js';
import { Loader } from '~/bundles/common/components/components.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';

type Properties = {
    chatId: number;
    selectedUser: ChatUserResponseDto;
};

const Chat: React.FC<Properties> = ({ chatId, selectedUser }) => {
    const { data: chat, isLoading: isLoadingChat } = useGetChatQuery(chatId);

    const [sendMessage] = useSendMessageMutation();

    const handleSendMessage = useCallback(
        (message: MessageRequestDto) => {
            void sendMessage(message);
        },
        [sendMessage],
    );

    return (
        <div className="flex flex-col justify-between w-full h-full">
            <ChatTopbar selectedUser={selectedUser} />
            {isLoadingChat ? (
                <div className="flex w-full h-full justify-center items-center">
                    <Loader size="medium" />
                </div>
            ) : (
                chat && (
                    <ChatList
                        chatId={chat.id}
                        messages={chat.messages}
                        selectedUser={selectedUser}
                        sendMessage={handleSendMessage}
                    />
                )
            )}
        </div>
    );
};

export { Chat };
