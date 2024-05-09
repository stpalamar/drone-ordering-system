import placeholder from '~/assets/img/placeholder.svg';
import { Avatar, AvatarImage } from '~/bundles/common/components/ui/avatar.js';
import { Card } from '~/bundles/common/components/ui/card.js';
import { type UserResponseDto } from '~/bundles/users/users.js';

type Properties = {
    manager: UserResponseDto;
};

const ManagerCard: React.FC<Properties> = ({ manager }) => {
    return (
        <Card className="flex flex-1 flex-col items-center justify-center p-8">
            <Avatar className="size-40 mb-4">
                <AvatarImage
                    src={
                        manager.details?.avatar
                            ? manager.details.avatar.url
                            : placeholder
                    }
                />
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
