import { Menu } from 'lucide-react';

import DroneIcon from '~/assets/img/icons/drone-icon.svg?react';
import { useLogoutMutation } from '~/bundles/auth/auth-api.js';
import { type NavItem } from '~/bundles/common/components/base-admin-layout/types/types.js';
import { Link } from '~/bundles/common/components/components.js';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '~/bundles/common/components/ui/avatar.js';
import { Badge } from '~/bundles/common/components/ui/badge.js';
import { Button } from '~/bundles/common/components/ui/button.js';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '~/bundles/common/components/ui/dropdown-menu.js';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '~/bundles/common/components/ui/sheet.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    capitalizeFirstLetter,
    getFirstLetter,
} from '~/bundles/common/helpers/helpers.js';
import {
    useAppSelector,
    useCallback,
    useNavigate,
} from '~/bundles/common/hooks/hooks.js';

import { HeaderNav } from './components/components.js';

type Properties = {
    navItems: NavItem[];
};

const Header: React.FC<Properties> = ({ navItems }) => {
    const navigate = useNavigate();
    const { user } = useAppSelector(({ auth }) => auth);

    const [logout] = useLogoutMutation();

    const handleLogout = useCallback(() => {
        void logout();
    }, [logout]);

    const handleClickSettings = useCallback(() => {
        navigate(AppRoute.PROFILE);
    }, [navigate]);

    const avatarFallback =
        user &&
        user.details &&
        getFirstLetter(user?.details.firstName) +
            getFirstLetter(user?.details.lastName);

    return (
        <header className="flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            {user && user.details && (
                <div className="hidden md:flex text-lg font-semibold">
                    <div className="">Welcome, {user.details.firstName}</div>
                </div>
            )}
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                    <nav className="grid gap-2 text-lg font-medium">
                        <Link
                            to={AppRoute.DASHBOARD}
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <DroneIcon className="h-6 w-6" />
                            <span className="sr-only">Drone Ordering</span>
                        </Link>
                        {navItems.map((navItem) => (
                            <HeaderNav key={navItem.to} {...navItem} />
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex gap-2 items-center">
                {user && user.details && (
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
                                        user &&
                                        user.details &&
                                        user.details.avatar
                                            ? user.details.avatar.url
                                            : undefined
                                    }
                                    alt="Your avatar"
                                />
                                <AvatarFallback>
                                    {avatarFallback}
                                </AvatarFallback>
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
        </header>
    );
};

export { Header };
