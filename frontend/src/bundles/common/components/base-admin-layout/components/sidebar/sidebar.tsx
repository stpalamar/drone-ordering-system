import { Users } from 'lucide-react';

import DroneIcon from '~/assets/img/icons/drone-icon.svg?react';
import { Can, Link } from '~/bundles/common/components/components.js';
import {
    AppRoute,
    PermissionAction,
    PermissionSubject,
} from '~/bundles/common/enums/enums.js';
import { type NavItem } from '~/bundles/common/types/types.js';

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
                        to={AppRoute.ADMIN_DASHBOARD}
                        className="flex items-center gap-2 font-semibold"
                    >
                        <DroneIcon className="h-6 w-6" />
                        <span className="">Drone Ordering</span>
                    </Link>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {navItems.map((navItem) => (
                            <SidebarNav key={navItem.to} {...navItem} />
                        ))}
                        <Can
                            I={PermissionAction.MANAGE}
                            a={PermissionSubject.USER}
                        >
                            <SidebarNav
                                to={AppRoute.ADMIN_MANAGERS}
                                icon={Users}
                                label="Managers"
                                isActive={false}
                            />
                        </Can>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export { Sidebar };
