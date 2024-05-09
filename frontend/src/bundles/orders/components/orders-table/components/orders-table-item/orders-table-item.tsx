import { Badge } from '~/bundles/common/components/ui/badge.js';
import { TableCell, TableRow } from '~/bundles/common/components/ui/table.js';
import { formatDate } from '~/bundles/common/helpers/helpers.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';
import { cn } from '~/bundles/common/lib/utils.js';
import { type OrderResponseDto } from '~/bundles/orders/types/types.js';

type Properties = {
    item: OrderResponseDto;
    isActive: boolean;
    onSelect: (item: OrderResponseDto) => void;
};

const OrdersTableItem: React.FC<Properties> = ({
    item,
    isActive,
    onSelect,
}) => {
    const { firstName, lastName, email, status, createdAt } = item;

    const handleSelect = useCallback(() => {
        onSelect(item);
    }, [onSelect, item]);

    return (
        <TableRow
            className={cn(isActive && 'bg-accent')}
            onClick={handleSelect}
        >
            <TableCell>
                <div className="font-medium">
                    {firstName} {lastName}
                </div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                    {email}
                </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
                {/* To be implemented */}
                type
            </TableCell>
            <TableCell className="hidden sm:table-cell">
                <Badge className="text-xs" variant="secondary">
                    {status.toUpperCase()}
                </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {formatDate(new Date(createdAt))}
            </TableCell>
            <TableCell className="text-right">
                {/* To be implemented */}
                $amount
            </TableCell>
        </TableRow>
    );
};

export { OrdersTableItem };
