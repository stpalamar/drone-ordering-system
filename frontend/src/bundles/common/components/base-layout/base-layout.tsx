import { Home, LineChart, Package, ShoppingCart, Users } from 'lucide-react';

import { RouterOutlet } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useLocation } from '~/bundles/common/hooks/hooks.js';

import { Header, Sidebar } from './components/components.js';
import { type NavItem } from './types/types.js';

const BaseLayout: React.FC = () => {
    const { pathname } = useLocation();

    const navItems: NavItem[] = [
        {
            to: AppRoute.DASHBOARD,
            icon: Home,
            label: 'Dashboard',
            isActive: pathname === AppRoute.DASHBOARD,
        },
        {
            to: AppRoute.ORDERS,
            icon: ShoppingCart,
            label: 'Orders',
            isActive: pathname === AppRoute.ORDERS,
        },
        {
            to: AppRoute.PRODUCTS,
            icon: Package,
            label: 'Products',
            isActive: pathname === AppRoute.PRODUCTS,
        },
        {
            to: AppRoute.ANALYTICS,
            icon: LineChart,
            label: 'Analytics',
            isActive: pathname === AppRoute.ANALYTICS,
        },
        {
            to: AppRoute.MANAGERS,
            icon: Users,
            label: 'Managers',
            isActive: pathname === AppRoute.MANAGERS,
        },
    ];

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Sidebar navItems={navItems} />
            <div className="flex flex-col">
                <Header navItems={navItems} />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <RouterOutlet />
                </main>
            </div>
        </div>
    );
};

export { BaseLayout };
