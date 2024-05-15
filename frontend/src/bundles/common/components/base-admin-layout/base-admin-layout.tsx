import { Home, LineChart, Package, ShoppingCart } from 'lucide-react';

import {
    Navigate,
    RouterOutlet,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useAppSelector, useLocation } from '~/bundles/common/hooks/hooks.js';
import { type NavItem } from '~/bundles/common/types/types.js';
import { UserRole } from '~/bundles/users/enums/enums.js';

import { Header, Sidebar } from './components/components.js';

const BaseAdminLayout: React.FC = () => {
    const { user } = useAppSelector(({ auth }) => auth);

    const { pathname } = useLocation();

    const navItems: NavItem[] = [
        {
            to: AppRoute.ADMIN_DASHBOARD,
            icon: Home,
            label: 'Dashboard',
            isActive: pathname === AppRoute.ADMIN_DASHBOARD,
        },
        {
            to: AppRoute.ADMIN_ORDERS,
            icon: ShoppingCart,
            label: 'Orders',
            isActive: pathname === AppRoute.ADMIN_ORDERS,
        },
        {
            to: AppRoute.ADMIN_PRODUCTS,
            icon: Package,
            label: 'Products',
            isActive: pathname === AppRoute.ADMIN_PRODUCTS,
        },
        {
            to: AppRoute.ADMIN_ANALYTICS,
            icon: LineChart,
            label: 'Analytics',
            isActive: pathname === AppRoute.ADMIN_ANALYTICS,
        },
    ];

    if (
        user &&
        (user.role === UserRole.ADMIN || user.role === UserRole.MANAGER)
    ) {
        return (
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <Sidebar navItems={navItems} />
                <div className="flex flex-col">
                    <Header navItems={navItems} />
                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 relative">
                        <RouterOutlet />
                    </main>
                </div>
            </div>
        );
    }

    return <Navigate to={AppRoute.ROOT} />;
};

export { BaseAdminLayout };
