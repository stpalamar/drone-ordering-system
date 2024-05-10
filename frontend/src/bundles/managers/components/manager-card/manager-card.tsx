import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '~/bundles/common/components/ui/avatar.js';
import { Card } from '~/bundles/common/components/ui/card.js';
import { getFirstLetter } from '~/bundles/common/helpers/helpers.js';
import { type UserResponseDto } from '~/bundles/users/users.js';

type Properties = {
    manager: UserResponseDto;
};

const ManagerCard: React.FC<Properties> = ({ manager }) => {
    const details = manager.details;

    const avatarFallback =
        details &&
        getFirstLetter(details.firstName) + getFirstLetter(details.lastName);

    return (
        <Card className="flex flex-1 flex-col items-center justify-center p-8">
            <Avatar className="size-40 mb-4">
                <AvatarImage
                    src={
                        manager.details?.avatar
                            ? manager.details.avatar.url
                            : undefined
                    }
                    alt="Manager avatar"
                />
                <AvatarFallback className="text-2xl">
                    {avatarFallback}
                </AvatarFallback>
            </Avatar>
            <div className="text-center">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    {manager.details?.firstName} {manager.details?.lastName}
                </h4>
                <p className="text-sm font-medium leading-none">
                    {manager.details?.phone}
                </p>
            </div>
        </Card>
    );
};

export { ManagerCard };
