import { useLogoutMutation } from '~/bundles/auth/auth-api.js';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '~/bundles/common/components/ui/avatar.js';
import { Badge } from '~/bundles/common/components/ui/badge.js';
import { Button } from '~/bundles/common/components/ui/button.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    capitalizeFirstLetter,
    getAvatarFallback,
} from '~/bundles/common/helpers/helpers.js';
import { useCallback, useNavigate } from '~/bundles/common/hooks/hooks.js';
import { type UserResponseDto } from '~/bundles/users/types/types.js';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu.js';

type Properties = {
    user: UserResponseDto;
    isAdmin?: boolean;
};

const AvatarMenu: React.FC<Properties> = ({ user, isAdmin = false }) => {
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();

    const handleLogout = useCallback(() => {
        void logout();
    }, [logout]);

    const handleClickSettings = useCallback(() => {
        navigate(isAdmin ? AppRoute.ADMIN_PROFILE : AppRoute.PROFILE);
    }, [navigate, isAdmin]);

    const avatarFallback =
        user.details &&
        getAvatarFallback(user.details.firstName, user.details.lastName);

    return (
        <div className="flex gap-2 items-center">
            {isAdmin && user.details && (
                <span>
                    <Badge className="cursor-default">
                        {capitalizeFirstLetter(user.role)}
                    </Badge>
                </span>
            )}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full"
                    >
                        <Avatar>
                            <AvatarImage
                                src={
                                    user.details && user.details.avatar
                                        ? user.details.avatar.url
                                        : undefined
                                }
                                alt="Your avatar"
                            />
                            <AvatarFallback>{avatarFallback}</AvatarFallback>
                        </Avatar>
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleClickSettings}>
                        Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export { AvatarMenu };
