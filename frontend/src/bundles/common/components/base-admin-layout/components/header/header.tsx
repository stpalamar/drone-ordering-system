import { CircleUser, Menu } from 'lucide-react';

import DroneIcon from '~/assets/img/icons/drone-icon.svg?react';
import { useLogoutMutation } from '~/bundles/auth/auth-api.js';
import { Link } from '~/bundles/common/components/components.js';
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
import { capitalizeFirstLetter } from '~/bundles/common/helpers/helpers.js';
import { useAppSelector, useCallback } from '~/bundles/common/hooks/hooks.js';

import { Badge } from '../../../ui/badge.js';
import { type NavItem } from '../../types/types.js';
import { HeaderNav } from './components/components.js';

type Properties = {
    navItems: NavItem[];
};

const Header: React.FC<Properties> = ({ navItems }) => {
    const { user } = useAppSelector(({ auth }) => auth);

    const [logout] = useLogoutMutation();

    const handleLogout = useCallback(() => {
        void logout();
    }, [logout]);

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
                            <CircleUser className="h-5 w-5" />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Settings</DropdownMenuItem>
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
