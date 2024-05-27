import { ArrowUpRight, CreditCard, DollarSign, Users2 } from 'lucide-react';

import { useGetTodayDashboardQuery } from '~/bundles/analytics/analytics-api.js';
import { Link, Loader } from '~/bundles/common/components/components.js';
import { Badge } from '~/bundles/common/components/ui/badge.js';
import { Button } from '~/bundles/common/components/ui/button.js';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '~/bundles/common/components/ui/card.js';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '~/bundles/common/components/ui/table.js';
import { AppRoute, Period } from '~/bundles/common/enums/enums.js';
import { formatDate, formatPrice } from '~/bundles/common/helpers/helpers.js';
import { AssignedType } from '~/bundles/orders/enums/enums.js';
import { getOrderStatusString } from '~/bundles/orders/helpers/helpers.js';
import { useGetOrdersQuery } from '~/bundles/orders/orders-api.js';

const Dashboard: React.FC = () => {
    const { data: dashboardData, isLoading: isLoadingAnalytics } =
        useGetTodayDashboardQuery();

    const { data: orders, isLoading: isLoadingOrders } = useGetOrdersQuery({
        page: 1,
        period: Period.ALL,
        status: null,
        assigned: AssignedType.ALL,
        limit: 5,
    });

    if (isLoadingAnalytics || isLoadingOrders || !dashboardData || !orders) {
        return <Loader size="large" isOverflow />;
    }

    const { todayRevenue, newUsers } = dashboardData;

    const recentSoldProducts = orders.items
        .flatMap((order) => order.items)
        .slice(0, 5);

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Today Revenue
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatPrice(todayRevenue.revenue)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {todayRevenue.increaseRevenuePercentage}% from
                            yesterday
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Today Sales
                        </CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {todayRevenue.amountOfOrders}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {todayRevenue.increaseAmountPercentage}% from
                            yesterday
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Today New Users
                        </CardTitle>
                        <Users2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+{newUsers}</div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                <Card className="xl:col-span-2">
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>Orders</CardTitle>
                            <CardDescription>
                                Recent orders from your customers.
                            </CardDescription>
                        </div>
                        <Button asChild size="sm" className="ml-auto gap-1">
                            <Link to={AppRoute.ADMIN_ORDERS}>
                                View All
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Customer</TableHead>

                                    <TableHead className="hidden xl:table-cell">
                                        Status
                                    </TableHead>
                                    <TableHead className="hidden xl:table-cell">
                                        Date
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Amount
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.items.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>
                                            <div className="font-medium">
                                                {order.firstName}{' '}
                                                {order.lastName}
                                            </div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                {order.email}
                                            </div>
                                        </TableCell>

                                        <TableCell className="hidden xl:table-cell">
                                            <Badge
                                                className="text-xs"
                                                variant="outline"
                                            >
                                                {getOrderStatusString(
                                                    order.status,
                                                )}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden xl:table-cell">
                                            {formatDate(
                                                new Date(order.createdAt),
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {formatPrice(order.totalPrice)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Sold</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-8">
                        {recentSoldProducts.map((product, index) => (
                            <div
                                className="flex items-center gap-4"
                                key={index}
                            >
                                <img
                                    src={product.imageUrl}
                                    alt={`${product.purpose} ${product.wingsType} drone`}
                                    className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        {product.purpose}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {product.wingsType}
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    {formatPrice(product.price)}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </main>
    );
};

export { Dashboard };
