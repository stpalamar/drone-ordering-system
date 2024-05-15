import { Menu } from 'lucide-react';

import DroneIcon from '~/assets/img/icons/drone-icon.svg?react';
import { AvatarMenu, Link } from '~/bundles/common/components/components.js';
import { Button } from '~/bundles/common/components/ui/button.js';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '~/bundles/common/components/ui/sheet.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';
import { type NavItem } from '~/bundles/common/types/types.js';

import { HeaderNav } from './components/components.js';

type Properties = {
    navItems: NavItem[];
};

const Header: React.FC<Properties> = ({ navItems }) => {
    const { user } = useAppSelector(({ auth }) => auth);

    return (
        <header className="flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            {user && user.details && (
                <div className="hidden md:flex text-lg font-semibold">
                    <div>Welcome, {user.details.firstName}</div>
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
                            to={AppRoute.ADMIN_DASHBOARD}
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
            {user && <AvatarMenu user={user} isAdmin />}
        </header>
    );
};

export { Header };
