import { AnimatePresence, motion } from 'framer-motion';

import { ChatBottombar } from '~/bundles/chats/components/components.js';
import {
    type ChatResponseDto,
    type ChatUserResponseDto,
    type MessageRequestDto,
    type MessageResponseDto,
} from '~/bundles/chats/types/types.js';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '~/bundles/common/components/ui/avatar.js';
import { getAvatarFallback } from '~/bundles/common/helpers/helpers.js';
import { useEffect, useRef } from '~/bundles/common/hooks/hooks.js';
import { cn } from '~/bundles/common/lib/utils.js';

type Properties = {
    chat: ChatResponseDto;
    messages: MessageResponseDto[];
    selectedUser: ChatUserResponseDto;
    sendMessage: (newMessage: MessageRequestDto) => void;
};

const ChatList: React.FC<Properties> = ({
    chat,
    messages,
    selectedUser,
    sendMessage,
}) => {
    const messagesContainerReference = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesContainerReference.current) {
            messagesContainerReference.current.scrollTop =
                messagesContainerReference.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
            <div
                ref={messagesContainerReference}
                className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col"
            >
                {messages.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                        <span className="text-gray-400">No messages yet</span>
                    </div>
                ) : (
                    <AnimatePresence>
                        {messages?.map((message, index) => (
                            <motion.div
                                key={index}
                                layout
                                initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
                                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                                exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                                transition={{
                                    opacity: { duration: 0.1 },
                                    layout: {
                                        type: 'spring',
                                        bounce: 0.3,
                                        duration:
                                            messages.indexOf(message) * 0.05 +
                                            0.2,
                                    },
                                }}
                                style={{
                                    originX: 0.5,
                                    originY: 0.5,
                                }}
                                className={cn(
                                    'flex flex-col gap-2 p-4 whitespace-pre-wrap',
                                    message.sender.id === selectedUser.id
                                        ? 'items-start'
                                        : 'items-end',
                                )}
                            >
                                <div className="flex gap-3 items-center">
                                    {message.sender.id === selectedUser.id && (
                                        <Avatar className="flex justify-center items-center">
                                            <AvatarImage
                                                src={
                                                    selectedUser.avatarUrl ??
                                                    undefined
                                                }
                                                alt={
                                                    selectedUser.firstName +
                                                    ' ' +
                                                    selectedUser.lastName
                                                }
                                                width={6}
                                                height={6}
                                            />
                                            <AvatarFallback>
                                                {getAvatarFallback(
                                                    selectedUser.firstName,
                                                    selectedUser.lastName,
                                                )}
                                            </AvatarFallback>
                                        </Avatar>
                                    )}
                                    <span className=" bg-accent p-3 rounded-md max-w-xs">
                                        {message.text}
                                    </span>
                                    {message.sender.id !== selectedUser.id && (
                                        <Avatar className="flex justify-center items-center">
                                            <AvatarImage
                                                src={
                                                    message.sender.avatarUrl ??
                                                    undefined
                                                }
                                                alt={
                                                    message.sender.firstName +
                                                    ' ' +
                                                    message.sender.lastName
                                                }
                                                width={6}
                                                height={6}
                                            />
                                            <AvatarFallback>
                                                {getAvatarFallback(
                                                    message.sender.firstName,
                                                    message.sender.lastName,
                                                )}
                                            </AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>
            <ChatBottombar sendMessage={sendMessage} chat={chat} />
        </div>
    );
};

export { ChatList };
