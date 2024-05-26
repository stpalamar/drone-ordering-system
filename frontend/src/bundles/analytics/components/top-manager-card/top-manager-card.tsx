import { User2 } from 'lucide-react';

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '~/bundles/common/components/ui/avatar.js';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '~/bundles/common/components/ui/card.js';
import { type Period } from '~/bundles/common/enums/enums.js';
import {
    capitalizeFirstLetter,
    getAvatarFallback,
} from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type UserResponseDto } from '~/bundles/users/types/types.js';

type Properties = {
    topManager: {
        manager: UserResponseDto;
        amountOfOrders: number;
    };
    period: ValueOf<typeof Period>;
};

const TopManagerCard: React.FC<Properties> = ({ topManager, period }) => {
    const { manager, amountOfOrders } = topManager;

    const avatarFallback =
        manager.details &&
        getAvatarFallback(manager.details.firstName, manager.details.lastName);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    This {capitalizeFirstLetter(period)} top manager
                </CardTitle>
                <User2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage
                            src={
                                manager.details && manager.details.avatar
                                    ? manager.details.avatar.url
                                    : undefined
                            }
                            alt={manager.details?.firstName}
                        />
                        <AvatarFallback>{avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                            {manager.details?.firstName}{' '}
                            {manager.details?.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {manager.email}
                        </p>
                    </div>
                    <div className="ml-auto font-medium">
                        {amountOfOrders} sales
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export { TopManagerCard };
