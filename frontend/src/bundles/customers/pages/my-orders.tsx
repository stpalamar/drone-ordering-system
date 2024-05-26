import {
    useCallback,
    useEffect,
    useSearchParams,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { Period } from '~/bundles/orders/enums/enums.js';
import { useGetOrdersQuery } from '~/bundles/orders/orders-api.js';
import { type OrderResponseDto } from '~/bundles/orders/types/types.js';

import { CustomerOrderCard } from '../components/components.js';
import { MyOrdersTable } from '../components/my-orders-table/my-orders-table.js';

const MyOrders: React.FC = () => {
    const [selectedOrder, setSelectedOrder] = useState<OrderResponseDto | null>(
        null,
    );

    const [searchParameters] = useSearchParams({
        page: '1',
    });

    const { data: orders, isLoading } = useGetOrdersQuery({
        page: Number(searchParameters.get('page')),
        period: Period.ALL,
        status: null,
        limit: 10,
        assigned: false,
    });

    const handleSelectOrder = useCallback((order: OrderResponseDto) => {
        setSelectedOrder(order);
    }, []);

    useEffect(() => {
        if (orders && orders.items.length > 0) {
            setSelectedOrder(orders.items[0] ?? null);
        }
    }, [orders]);

    return (
        <main className="grid flex-1 items-start justify-center gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="flex flex-col gap-4 lg:gap-8">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Your orders
                </h3>
                <div className="flex flex-col-reverse md:flex-row gap-8">
                    <MyOrdersTable
                        items={orders ? orders.items : null}
                        selectedOrder={selectedOrder}
                        onSelect={handleSelectOrder}
                        isLoading={isLoading}
                    />
                    {selectedOrder && (
                        <CustomerOrderCard order={selectedOrder} />
                    )}
                </div>
            </div>
        </main>
    );
};

export { MyOrders };
