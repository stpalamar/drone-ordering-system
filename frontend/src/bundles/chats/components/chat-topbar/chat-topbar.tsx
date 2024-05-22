import { Info } from 'lucide-react';

import { type ChatUserResponseDto } from '~/bundles/chats/types/types.js';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '~/bundles/common/components/ui/avatar.js';
import { buttonVariants } from '~/bundles/common/components/ui/button.js';
import { getAvatarFallback } from '~/bundles/common/helpers/helpers.js';
import { cn } from '~/bundles/common/lib/utils.js';

type Properties = {
    selectedUser: ChatUserResponseDto;
};

const TopbarIcons = [{ icon: Info }];

const ChatTopbar: React.FC<Properties> = ({ selectedUser }) => {
    return (
        <div className="w-full h-20 flex p-4 justify-between items-center border-b">
            <div className="flex items-center gap-2">
                <Avatar className="flex justify-center items-center">
                    <AvatarImage
                        src={selectedUser.avatarUrl ?? undefined}
                        alt="User avatar"
                        width={6}
                        height={6}
                        className="w-10 h-10 "
                    />
                    <AvatarFallback>
                        {getAvatarFallback(
                            selectedUser.firstName,
                            selectedUser.lastName,
                        )}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-medium">
                        {selectedUser.firstName + ' ' + selectedUser.lastName}
                    </span>
                </div>
            </div>

            <div>
                {TopbarIcons.map((icon, index) => (
                    <div
                        key={index}
                        className={cn(
                            buttonVariants({ variant: 'ghost', size: 'icon' }),
                            'h-9 w-9',
                            'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
                        )}
                    >
                        <icon.icon
                            size={20}
                            className="text-muted-foreground"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export { ChatTopbar };
