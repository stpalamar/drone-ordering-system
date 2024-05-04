import { File, ListFilter } from 'lucide-react';
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
import { Progress } from '~/bundles/common/components/ui/progress.js';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '~/bundles/common/components/ui/tabs.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useCallback,
    useEffect,
    useSearchParams,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { cn } from '~/bundles/common/lib/utils.js';
import {
    OrderDetails,
    OrdersTable,
} from '~/bundles/orders/components/components.js';
import { useGetOrdersQuery } from '~/bundles/orders/orders-api.js';
import { type OrderResponseDto } from '~/bundles/orders/types/types.js';

const Orders: React.FC = () => {
    const [searchParameters, setSearchParameters] = useSearchParams({
        page: '1',
    });

    const [selectedOrder, setSelectedOrder] = useState<OrderResponseDto | null>(
        null,
    );

    const { data: orders, isLoading } = useGetOrdersQuery(
        Number(searchParameters.get('page')),
    );

    const handlePageChange = useCallback(
        (page: number) => {
            setSearchParameters({ page: String(page) });
        },
        [setSearchParameters],
    );

    const handleSelectOrder = useCallback((order: OrderResponseDto) => {
        setSelectedOrder(order);
    }, []);

    useEffect(() => {
        if (orders && orders.items[0]) {
            setSelectedOrder(orders.items[0]);
        }
    }, [orders]);

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
                                Introducing Our Dynamic Orders Dashboard for
                                Seamless Management and Insightful Analysis.
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Link to={AppRoute.ORDERS_CREATE}>
                                <Button>Create New Order</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>This Week</CardDescription>
                            <CardTitle className="text-4xl">$1,329</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-muted-foreground">
                                +25% from last week
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Progress value={25} aria-label="25% increase" />
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>This Month</CardDescription>
                            <CardTitle className="text-4xl">$5,329</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-muted-foreground">
                                +10% from last month
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Progress value={12} aria-label="12% increase" />
                        </CardFooter>
                    </Card>
                </div>
                <Tabs defaultValue="week">
                    <div className="flex items-center">
                        <TabsList>
                            <TabsTrigger value="week">Week</TabsTrigger>
                            <TabsTrigger value="month">Month</TabsTrigger>
                            <TabsTrigger value="year">Year</TabsTrigger>
                        </TabsList>
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
                                            Filter
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        Filter by
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem checked>
                                        Fulfilled
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>
                                        Declined
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>
                                        Refunded
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-7 gap-1 text-sm"
                            >
                                <File className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only">
                                    Export
                                </span>
                            </Button>
                        </div>
                    </div>
                    <TabsContent value="week">
                        <Card>
                            <CardHeader className="px-7">
                                <CardTitle>Orders</CardTitle>
                                <CardDescription>
                                    Recent orders from your store.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <OrdersTable
                                    items={orders ? orders.items : null}
                                    selectedOrder={selectedOrder}
                                    onSelect={handleSelectOrder}
                                    isLoading={isLoading}
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
                    </TabsContent>
                </Tabs>
            </div>
            {selectedOrder && <OrderDetails order={selectedOrder} />}
        </main>
    );
};

export { Orders };
