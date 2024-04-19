import { Bell, Package2 } from 'lucide-react';

import { Link } from '~/bundles/common/components/components.js';
import { Button } from '~/bundles/common/components/ui/button.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';

import { type NavItem } from '../../types/types.js';
import { SidebarNav } from './components/components.js';

type Properties = {
    navItems: NavItem[];
};

const Sidebar: React.FC<Properties> = ({ navItems }) => {
    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link
                        to={AppRoute.DASHBOARD}
                        className="flex items-center gap-2 font-semibold"
                    >
                        <Package2 className="h-6 w-6" />
                        <span className="">Drone Ordering</span>
                    </Link>
                    <Button
                        variant="outline"
                        size="icon"
                        className="ml-auto h-8 w-8"
                    >
                        <Bell className="h-4 w-4" />
                        <span className="sr-only">Toggle notifications</span>
                    </Button>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {navItems.map((navItem) => (
                            <SidebarNav key={navItem.to} {...navItem} />
                        ))}
                        {/* <SidebarNav
                            to={AppRoute.DASHBOARD}
                            icon={Home}
                            label="Dashboard"
                            isActive={pathname === AppRoute.DASHBOARD}
                        />
                        <SidebarNav
                            to={AppRoute.ORDERS}
                            icon={ShoppingCart}
                            label="Orders"
                            isActive={pathname === AppRoute.ORDERS}
                        />
                        <SidebarNav
                            to={AppRoute.PRODUCTS}
                            icon={Package}
                            label="Products"
                            isActive={pathname === AppRoute.PRODUCTS}
                        />
                        <SidebarNav
                            to={AppRoute.ANALYTICS}
                            icon={LineChart}
                            label="Analytics"
                            isActive={pathname === AppRoute.ANALYTICS}
                        />
                        <SidebarNav
                            to={AppRoute.MANAGERS}
                            icon={Users}
                            label="Managers"
                            isActive={pathname === AppRoute.MANAGERS}
                        /> */}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export { Sidebar };
