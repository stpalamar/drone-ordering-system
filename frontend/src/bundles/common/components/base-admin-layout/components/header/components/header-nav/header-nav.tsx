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

const HeaderNav: React.FC<Properties> = ({
    to,
    icon,
    label,
    isActive,
    badgeAmount,
}) => {
    const Icon = icon;

    const styles = {
        active: 'bg-muted',
        inactive: 'text-muted-foreground',
    };

    return (
        <Link
            to={to}
            className={cn(
                'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground',
                isActive ? styles.active : styles.inactive,
            )}
        >
            <Icon className="h-5 w-5" />
            {label}
            {badgeAmount && (
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {badgeAmount}
                </Badge>
            )}
        </Link>
    );
};

export { HeaderNav };
