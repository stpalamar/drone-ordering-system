import { Folders, Menu, ShoppingCart } from 'lucide-react';

import DroneIcon from '~/assets/img/icons/drone-icon.svg?react';
import { AvatarMenu, Link } from '~/bundles/common/components/components.js';
import { buttonVariants } from '~/bundles/common/components/ui/button.js';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from '~/bundles/common/components/ui/navigation-menu.js';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '~/bundles/common/components/ui/sheet.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useAppSelector, useLocation } from '~/bundles/common/hooks/hooks.js';
import { type NavItem } from '~/bundles/common/types/types.js';
import { UserRole } from '~/bundles/users/enums/enums.js';

const Header: React.FC = () => {
    const { user } = useAppSelector(({ auth }) => auth);

    const { pathname } = useLocation();

    const navItems: NavItem[] = [
        {
            to: AppRoute.MY_ORDERS,
            icon: Folders,
            label: 'My orders',
            isActive: pathname === AppRoute.MY_ORDERS,
        },
        {
            to: AppRoute.MY_ORDER_CREATE,
            icon: ShoppingCart,
            label: 'Create order',
            isActive: pathname === AppRoute.MY_ORDER_CREATE,
        },
    ];

    const isEmployee =
        user?.role === UserRole.MANAGER || user?.role === UserRole.ADMIN;

    return (
        <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
            <NavigationMenu className="mx-auto">
                <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
                    <NavigationMenuItem className="font-bold flex">
                        <Link
                            to={AppRoute.ROOT}
                            className="ml-2 font-bold text-xl flex items-center"
                        >
                            <DroneIcon className="h-6 w-6 mr-2" />
                            Drone Ordering
                        </Link>
                    </NavigationMenuItem>
                    <span className="flex md:hidden">
                        <Sheet>
                            <SheetTrigger className="px-2">
                                <Menu className="flex md:hidden h-5 w-5">
                                    <span className="sr-only">Menu Icon</span>
                                </Menu>
                            </SheetTrigger>

                            <SheetContent side={'left'}>
                                <SheetHeader>
                                    <SheetTitle className="font-bold text-xl flex items-center justify-center">
                                        <DroneIcon className="h-6 w-6 mr-2" />
                                        Drone Ordering
                                    </SheetTitle>
                                </SheetHeader>
                                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                                    {user ? (
                                        <>
                                            {navItems.map((route: NavItem) => {
                                                const Icon = route.icon;
                                                return (
                                                    <Link
                                                        to={route.to}
                                                        key={route.to}
                                                        className={`text-[17px] ${buttonVariants(
                                                            {
                                                                variant:
                                                                    'ghost',
                                                            },
                                                        )}`}
                                                    >
                                                        <Icon className="size-4 mr-1" />
                                                        {route.label}
                                                    </Link>
                                                );
                                            })}
                                            <div className="flex flex-row-reverse items-center gap-3">
                                                <span className="font-semibold">
                                                    Hello,{' '}
                                                    {user.details?.firstName}
                                                </span>
                                                <AvatarMenu user={user} />
                                            </div>
                                        </>
                                    ) : (
                                        <Link
                                            to={AppRoute.SIGN_IN}
                                            className={`w-28 border ${buttonVariants({ variant: 'default' })}`}
                                        >
                                            Sign In
                                        </Link>
                                    )}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </span>
                    {user ? (
                        <>
                            <nav className="hidden md:flex gap-2">
                                {navItems.map((route: NavItem) => {
                                    const Icon = route.icon;
                                    return (
                                        <Link
                                            to={route.to}
                                            key={route.to}
                                            className={`text-[17px] ${buttonVariants(
                                                {
                                                    variant: 'ghost',
                                                },
                                            )}`}
                                        >
                                            <Icon className="size-4 mr-1" />
                                            {route.label}
                                        </Link>
                                    );
                                })}
                                {isEmployee && (
                                    <Link
                                        to={AppRoute.ADMIN_ROOT}
                                        className={`text-[17px] ${buttonVariants(
                                            {
                                                variant: 'ghost',
                                            },
                                        )}`}
                                    >
                                        <DroneIcon className="size-4 mr-1" />
                                        Dashboard
                                    </Link>
                                )}
                            </nav>
                            <div className="hidden md:flex flex-row items-center gap-6">
                                <span className="font-semibold">
                                    Hello, {user.details?.firstName}
                                </span>
                                <AvatarMenu user={user} />
                            </div>
                        </>
                    ) : (
                        <div className="hidden md:flex gap-2">
                            <Link
                                to={AppRoute.SIGN_IN}
                                className={`w-28 border ${buttonVariants({ variant: 'default' })}`}
                            >
                                Sign In
                            </Link>
                        </div>
                    )}
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    );
};

export { Header };
