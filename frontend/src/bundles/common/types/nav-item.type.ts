import { type AppRoute } from '~/bundles/common/enums/enums.js';
import { type LucideIcon, type ValueOf } from '~/bundles/common/types/types.js';

type NavItem = {
    to: ValueOf<typeof AppRoute>;
    icon: LucideIcon;
    label: string;
    isActive: boolean;
    badgeAmount?: number;
};

export { type NavItem };
