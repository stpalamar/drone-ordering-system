import { Trash2Icon } from 'lucide-react';

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '~/bundles/common/components/ui/avatar.js';
import { Button } from '~/bundles/common/components/ui/button.js';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '~/bundles/common/components/ui/tooltip.js';
import { type ControllerRenderProps } from '~/bundles/common/types/types.js';
import { type UserDetailsDto } from '~/bundles/users/types/types.js';

type Properties = {
    field: ControllerRenderProps<UserDetailsDto, 'avatar'>;
    onDeleteAvatar: () => void;
    avatarFallback: string;
};

const AvatarPreviewField: React.FC<Properties> = ({
    field,
    onDeleteAvatar,
    avatarFallback,
}) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Avatar className="size-32 cursor-pointer">
                        <AvatarImage
                            src={field.value ? field.value.url : undefined}
                            alt="Your avatar"
                        />
                        <AvatarFallback>{avatarFallback}</AvatarFallback>
                    </Avatar>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={-20} className="p-0">
                    <Button
                        variant="destructive"
                        size="icon"
                        type="button"
                        onClick={onDeleteAvatar}
                    >
                        <Trash2Icon className="w-4 h-4" />
                        <span className="sr-only">Remove avatar</span>
                    </Button>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export { AvatarPreviewField };
