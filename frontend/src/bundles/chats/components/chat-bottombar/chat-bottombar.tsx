import { AnimatePresence, motion } from 'framer-motion';
import { SendHorizontal } from 'lucide-react';

import { type MessageRequestDto } from '~/bundles/chats/types/types.js';
import { Button } from '~/bundles/common/components/ui/button.js';
import { Textarea } from '~/bundles/common/components/ui/textarea.js';
import { useCallback, useRef, useState } from '~/bundles/common/hooks/hooks.js';

type Propeties = {
    chatId: number;
    sendMessage: (newMessage: MessageRequestDto) => void;
};

const ChatBottombar: React.FC<Propeties> = ({ sendMessage, chatId }) => {
    const [message, setMessage] = useState('');
    const inputReference = useRef<HTMLTextAreaElement>(null);

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setMessage(event.target.value);
        },
        [setMessage],
    );

    const handleSend = useCallback(() => {
        if (message.trim()) {
            const newMessage: MessageRequestDto = {
                text: message.trim(),
                chatId: chatId,
            };
            sendMessage(newMessage);
            setMessage('');

            if (inputReference.current) {
                inputReference.current.focus();
            }
        }
    }, [chatId, message, sendMessage]);

    const handleKeyPress = useCallback(
        (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                handleSend();
            }

            if (event.key === 'Enter' && event.shiftKey) {
                event.preventDefault();
                setMessage((previous) => previous + '\n');
            }
        },
        [setMessage, handleSend],
    );

    return (
        <div className="p-2 flex justify-between w-full items-center gap-2">
            <AnimatePresence initial={false}>
                <motion.div
                    key="input"
                    className="w-full relative"
                    layout
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1 }}
                    transition={{
                        opacity: { duration: 0.05 },
                        layout: {
                            type: 'spring',
                            bounce: 0.15,
                        },
                    }}
                >
                    <Textarea
                        autoComplete="off"
                        value={message}
                        ref={inputReference}
                        onKeyDown={handleKeyPress}
                        onChange={handleInputChange}
                        maxLength={500}
                        name="message"
                        placeholder="Message"
                        className="w-full border rounded-full flex items-center h-9 resize-none overflow-hidden bg-background"
                    ></Textarea>
                </motion.div>
                <Button variant="ghost" size="icon" onClick={handleSend}>
                    <SendHorizontal
                        size={20}
                        className="text-muted-foreground"
                    />
                </Button>
            </AnimatePresence>
        </div>
    );
};

export { ChatBottombar };
