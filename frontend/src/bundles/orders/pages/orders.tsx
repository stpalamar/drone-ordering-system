import { ListFilter, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '~/bundles/common/components/ui/button.js';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '~/bundles/common/components/ui/card.js';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '~/bundles/common/components/ui/dropdown-menu.js';
import { Pagination } from '~/bundles/common/components/ui/pagination.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    capitalizeFirstLetter,
    getFiltersArray,
} from '~/bundles/common/helpers/helpers.js';
import {
    useAppSelector,
    useCallback,
    useEffect,
    useSearchParams,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { cn } from '~/bundles/common/lib/utils.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import {
    OrderCard,
    OrdersTable,
    RevenueCards,
} from '~/bundles/orders/components/components.js';
import { OrderStatus, Period } from '~/bundles/orders/enums/enums.js';
import { useGetOrdersQuery } from '~/bundles/orders/orders-api.js';
import { type OrderResponseDto } from '~/bundles/orders/types/types.js';

import { UserRole } from '../../../../../shared/src/bundles/users/users.js';

const Orders: React.FC = () => {
    const { user } = useAppSelector(({ auth }) => auth);

    const [searchParameters, setSearchParameters] = useSearchParams({
        page: '1',
        period: 'all',
        assigned: 'true',
    });

    const [selectedOrder, setSelectedOrder] = useState<OrderResponseDto | null>(
        null,
    );

    const {
        data: orders,
        isLoading,
        refetch,
    } = useGetOrdersQuery({
        page: Number(searchParameters.get('page')),
        period:
            (searchParameters.get('period') as ValueOf<typeof Period>) ??
            Period.ALL,
        status: getFiltersArray(searchParameters.get('status')) as
            | ValueOf<typeof OrderStatus>[]
            | null,
        assigned: searchParameters.get('assigned') === 'true',
        limit: 10,
    });

    const handlePageChange = useCallback(
        (page: number) => {
            setSearchParameters({ page: String(page) });
        },
        [setSearchParameters],
    );

    const handlePeriodChange = useCallback(
        (period: ValueOf<typeof Period>) => {
            setSearchParameters({ period, page: '1' });
        },
        [setSearchParameters],
    );

    const handleStatusChange = useCallback(
        (status: ValueOf<typeof OrderStatus>) => {
            setSearchParameters({
                page: '1',
                period: searchParameters.get('period') ?? Period.ALL,
                status: status,
            });
        },
        [searchParameters, setSearchParameters],
    );

    const handleUnassignedChange = useCallback(
        (assigned: boolean) => {
            setSearchParameters({
                page: '1',
                period: searchParameters.get('period') ?? Period.ALL,
                // status: searchParameters.get('status'),
                assigned: String(assigned),
            });
        },
        [searchParameters, setSearchParameters],
    );

    const handleSelectOrder = useCallback((order: OrderResponseDto) => {
        setSelectedOrder(order);
    }, []);

    const handleRefresh = useCallback(() => {
        void refetch();
    }, [refetch]);

    useEffect(() => {
        if (orders && orders.items[0]) {
            setSelectedOrder(orders.items[0]);
        }
    }, [orders]);

    const activeTab = 'bg-background text-foreground shadow-sm';

    return (
        <main
            className={cn(
                'grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8',
                selectedOrder && 'lg:grid-cols-3 xl:grid-cols-3',
            )}
        >
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                    <Card className="sm:col-span-2">
                        <CardHeader className="pb-3">
                            <CardTitle>Your Orders</CardTitle>
                            <CardDescription className="max-w-lg text-balance leading-relaxed">
                                Keep track of your orders and manage them
                                efficiently. You can see only your orders here.
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Link to={AppRoute.ADMIN_ORDER_CREATE}>
                                <Button>Create New Order</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                    <RevenueCards />
                </div>
                <div>
                    <div className="flex items-center gap-4">
                        {user && user.role === UserRole.MANAGER && (
                            <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                                <Button
                                    variant="tab"
                                    size="tab"
                                    className={cn(
                                        searchParameters.get('assigned') ===
                                            'true' && activeTab,
                                    )}
                                    onClick={() => handleUnassignedChange(true)}
                                >
                                    Yours
                                </Button>
                                <Button
                                    variant="tab"
                                    size="tab"
                                    className={cn(
                                        searchParameters.get('assigned') ===
                                            'false' && activeTab,
                                    )}
                                    onClick={() =>
                                        handleUnassignedChange(false)
                                    }
                                >
                                    Unassigned
                                </Button>
                            </div>
                        )}

                        <div className="ml-auto flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-7 gap-1 text-sm"
                                    >
                                        <ListFilter className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only">
                                            Period
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        Filter by
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem
                                        onClick={() =>
                                            handlePeriodChange(Period.ALL)
                                        }
                                        checked={
                                            searchParameters.get('period') ===
                                                Period.ALL ?? false
                                        }
                                    >
                                        {capitalizeFirstLetter(Period.ALL)}
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        onClick={() =>
                                            handlePeriodChange(Period.WEEK)
                                        }
                                        checked={
                                            searchParameters.get('period') ===
                                                Period.WEEK ?? false
                                        }
                                    >
                                        {capitalizeFirstLetter(Period.WEEK)}
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        onClick={() =>
                                            handlePeriodChange(Period.MONTH)
                                        }
                                        checked={
                                            searchParameters.get('period') ===
                                                Period.MONTH ?? false
                                        }
                                    >
                                        {capitalizeFirstLetter(Period.MONTH)}
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        onClick={() =>
                                            handlePeriodChange(Period.YEAR)
                                        }
                                        checked={
                                            searchParameters.get('period') ===
                                                Period.YEAR ?? false
                                        }
                                    >
                                        {capitalizeFirstLetter(Period.YEAR)}
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-7 gap-1 text-sm"
                                    >
                                        <ListFilter className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only">
                                            Status
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        Filter by
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem
                                        onClick={() =>
                                            handleStatusChange(
                                                OrderStatus.PENDING,
                                            )
                                        }
                                        checked={
                                            getFiltersArray(
                                                searchParameters.get('status'),
                                            )?.includes(OrderStatus.PENDING) ??
                                            false
                                        }
                                    >
                                        {capitalizeFirstLetter(
                                            OrderStatus.PENDING,
                                        )}
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        onClick={() =>
                                            handleStatusChange(
                                                OrderStatus.CONFIRMED,
                                            )
                                        }
                                        checked={
                                            getFiltersArray(
                                                searchParameters.get('status'),
                                            )?.includes(
                                                OrderStatus.CONFIRMED,
                                            ) ?? false
                                        }
                                    >
                                        {capitalizeFirstLetter(
                                            OrderStatus.CONFIRMED,
                                        )}
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        onClick={() =>
                                            handleStatusChange(
                                                OrderStatus.IN_PROGRESS,
                                            )
                                        }
                                        checked={
                                            getFiltersArray(
                                                searchParameters.get('status'),
                                            )?.includes(
                                                OrderStatus.IN_PROGRESS,
                                            ) ?? false
                                        }
                                    >
                                        {capitalizeFirstLetter(
                                            OrderStatus.IN_PROGRESS,
                                        ).replace('_', ' ')}
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        onClick={() =>
                                            handleStatusChange(
                                                OrderStatus.READY,
                                            )
                                        }
                                        checked={
                                            getFiltersArray(
                                                searchParameters.get('status'),
                                            )?.includes(OrderStatus.READY) ??
                                            false
                                        }
                                    >
                                        {capitalizeFirstLetter(
                                            OrderStatus.READY,
                                        )}
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        onClick={() =>
                                            handleStatusChange(
                                                OrderStatus.DELIVERED,
                                            )
                                        }
                                        checked={
                                            getFiltersArray(
                                                searchParameters.get('status'),
                                            )?.includes(
                                                OrderStatus.DELIVERED,
                                            ) ?? false
                                        }
                                    >
                                        {capitalizeFirstLetter(
                                            OrderStatus.DELIVERED,
                                        )}
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        onClick={() =>
                                            handleStatusChange(
                                                OrderStatus.CANCELLED,
                                            )
                                        }
                                        checked={
                                            getFiltersArray(
                                                searchParameters.get('status'),
                                            )?.includes(
                                                OrderStatus.CANCELLED,
                                            ) ?? false
                                        }
                                    >
                                        {capitalizeFirstLetter(
                                            OrderStatus.CANCELLED,
                                        )}
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <Card className="mt-2">
                        <CardHeader className="px-7 flex flex-row justify-between">
                            <div>
                                <CardTitle>Orders</CardTitle>
                                <CardDescription>
                                    Recent orders from your customers
                                </CardDescription>
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleRefresh}
                            >
                                <RefreshCcw className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <OrdersTable
                                items={orders ? orders.items : null}
                                selectedOrder={selectedOrder}
                                onSelect={handleSelectOrder}
                                isLoading={isLoading}
                                isAdmin={user?.role === UserRole.ADMIN}
                            />
                        </CardContent>
                        <CardFooter>
                            {orders && (
                                <Pagination
                                    currentPage={orders.page}
                                    totalPages={orders.totalPages}
                                    setCurrentPage={handlePageChange}
                                />
                            )}
                        </CardFooter>
                    </Card>
                </div>
            </div>
            {selectedOrder && <OrderCard order={selectedOrder} />}
        </main>
    );
};

export { Orders };
