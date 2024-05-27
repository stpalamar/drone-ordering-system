import { Badge } from '~/bundles/common/components/ui/badge.js';
import { TableCell, TableRow } from '~/bundles/common/components/ui/table.js';
import { formatDate, formatPrice } from '~/bundles/common/helpers/helpers.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';
import { cn } from '~/bundles/common/lib/utils.js';
import { getOrderStatusString } from '~/bundles/orders/helpers/helpers.js';
import { type OrderResponseDto } from '~/bundles/orders/types/types.js';

type Properties = {
    item: OrderResponseDto;
    isActive: boolean;
    onSelect: (item: OrderResponseDto) => void;
};

const MyOrdersTableItem: React.FC<Properties> = ({
    item,
    isActive,
    onSelect,
}) => {
    const { manager, status, totalPrice, createdAt } = item;

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
                    {manager
                        ? `${manager.details?.firstName} ${manager.details?.lastName}`
                        : 'No manager yet'}
                </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
                <Badge className="text-xs" variant="secondary">
                    {getOrderStatusString(status)}
                </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {formatDate(new Date(createdAt))}
            </TableCell>
            <TableCell className="text-right">
                {formatPrice(totalPrice)}
            </TableCell>
        </TableRow>
    );
};

export { MyOrdersTableItem };
