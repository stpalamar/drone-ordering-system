import { ChevronRight, Copy } from 'lucide-react';
import { toast } from 'sonner';

import { Badge } from '~/bundles/common/components/ui/badge.js';
import { Button } from '~/bundles/common/components/ui/button.js';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '~/bundles/common/components/ui/card.js';
import { Separator } from '~/bundles/common/components/ui/separator.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    configureUrlString,
    formatDateWithMonth,
    formatPrice,
} from '~/bundles/common/helpers/helpers.js';
import { useCallback, useNavigate } from '~/bundles/common/hooks/hooks.js';
import { getOrderStatusString } from '~/bundles/orders/helpers/helpers.js';
import { type OrderResponseDto } from '~/bundles/orders/types/types.js';

type Properties = {
    order: OrderResponseDto;
};

const CustomerOrderCard: React.FC<Properties> = ({ order }) => {
    const { orderNumber, createdAt, manager, status } = order;

    const navigate = useNavigate();

    const handleViewMore = useCallback(() => {
        const path = configureUrlString(AppRoute.MY_ORDER_$ID, {
            id: String(order.id),
        });
        navigate(path);
    }, [order.id, navigate]);

    const handleCopyToClipboard = useCallback(() => {
        void navigator.clipboard.writeText(orderNumber);
        toast.success('Order ID copied to clipboard');
    }, [orderNumber]);

    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-col items-start bg-muted/50">
                <CardTitle className="group flex items-center gap-2 text-lg">
                    Order: {orderNumber.toUpperCase()}
                    <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                        onClick={handleCopyToClipboard}
                    >
                        <Copy className="h-3 w-3" />
                        <span className="sr-only">Copy Order ID</span>
                    </Button>
                </CardTitle>
                <div className="flex w-full flex-col xl:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col items-center gap-2 xl:items-start">
                        <CardDescription>
                            Date: {formatDateWithMonth(new Date(createdAt))}
                        </CardDescription>
                        <Badge className="w-min whitespace-nowrap">
                            {getOrderStatusString(status)}
                        </Badge>
                    </div>
                    <div className="flex flex-row gap-1">
                        <Button
                            size="sm"
                            variant="outline"
                            className="h-8 gap-1"
                            onClick={handleViewMore}
                        >
                            <ChevronRight className="h-3.5 w-3.5" />
                            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                                View more
                            </span>
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                    <div className="font-semibold">Order Details</div>
                    <ul className="grid gap-3">
                        {order.items.map((item, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between"
                            >
                                <span className="text-muted-foreground">
                                    {item.purpose} {item.wingsType} x{' '}
                                    <span>{item.amount}</span>
                                </span>
                                <span>{formatPrice(item.price)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                    <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                            <dt className="font-bold">Your manager</dt>
                            <dd>
                                {manager
                                    ? `${manager.details?.firstName} ${manager.details?.lastName}`
                                    : 'No manager yet'}
                            </dd>
                        </div>
                    </dl>
                </div>
            </CardContent>
            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                    Updated{' '}
                    <time dateTime="2023-11-23">
                        {formatDateWithMonth(new Date(createdAt))}
                    </time>
                </div>
            </CardFooter>
        </Card>
    );
};

export { CustomerOrderCard };
