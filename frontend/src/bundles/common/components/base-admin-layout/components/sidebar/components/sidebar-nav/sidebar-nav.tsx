import { Link } from '~/bundles/common/components/components.js';
import { Badge } from '~/bundles/common/components/ui/badge.js';
import { type AppRoute } from '~/bundles/common/enums/enums.js';
import { cn } from '~/bundles/common/lib/utils.js';
import { type LucideIcon, type ValueOf } from '~/bundles/common/types/types.js';

type Properties = {
    to: ValueOf<typeof AppRoute>;
    icon: LucideIcon;
    label: string;
    isActive: boolean;
    badgeAmount?: number;
};

const SidebarNav: React.FC<Properties> = ({
    to,
    icon,
    label,
    isActive,
    badgeAmount,
}) => {
    const Icon = icon;

    const styles = {
        active: 'text-primary bg-muted',
        inactive: 'text-muted-foreground',
    };

    return (
        <Link
            to={to}
            className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                isActive ? styles.active : styles.inactive,
            )}
        >
            <Icon className="h-4 w-4" />
            {label}
            {badgeAmount && (
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {badgeAmount}
                </Badge>
            )}
        </Link>
    );
};

export { SidebarNav };
