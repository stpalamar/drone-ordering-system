import { Loader } from '~/bundles/common/components/components.js';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '~/bundles/common/components/ui/table.js';
import { type OrderResponseDto } from '~/bundles/orders/types/types.js';

import { MyOrdersTableItem as TableItem } from '../my-orders-table-item/my-orders-table-item.js';

type Properties = {
    items: OrderResponseDto[] | null;
    selectedOrder: OrderResponseDto | null;
    onSelect: (item: OrderResponseDto) => void;
    isLoading: boolean;
};

const MyOrdersTable: React.FC<Properties> = ({
    items,
    onSelect,
    selectedOrder,
    isLoading,
}) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Manager</TableHead>
                    <TableHead className="hidden sm:table-cell">
                        Status
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {isLoading && (
                    <TableRow>
                        <TableCell colSpan={7} className="p-24">
                            <Loader size="medium" isOverflow />
                        </TableCell>
                    </TableRow>
                )}
                {(!isLoading && !items) ||
                    (items?.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="p-24">
                                <p className="text-center text-gray-500">
                                    No orders found
                                </p>
                            </TableCell>
                        </TableRow>
                    ))}
                {!isLoading &&
                    items &&
                    items.map((item, index) => (
                        <TableItem
                            item={item}
                            key={index}
                            isActive={
                                selectedOrder
                                    ? selectedOrder.id === item.id
                                    : false
                            }
                            onSelect={onSelect}
                        />
                    ))}
            </TableBody>
        </Table>
    );
};

export { MyOrdersTable };
