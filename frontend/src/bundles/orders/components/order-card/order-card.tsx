import { ChevronRight, Copy, MoreVertical } from 'lucide-react';
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '~/bundles/common/components/ui/dropdown-menu.js';
import { Separator } from '~/bundles/common/components/ui/separator.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    configureUrlString,
    formatDateWithMonth,
    formatPrice,
} from '~/bundles/common/helpers/helpers.js';
import {
    useCallback,
    useNavigate,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { ChangeStatusDialog } from '~/bundles/orders/components/components.js';
import { getOrderStatusString } from '~/bundles/orders/helpers/helpers.js';
import { useUpdateOrderStatusMutation } from '~/bundles/orders/orders-api.js';
import {
    type OrderResponseDto,
    type OrderStatusDto,
} from '~/bundles/orders/types/types.js';

type Properties = {
    order: OrderResponseDto;
};

const OrderCard: React.FC<Properties> = ({ order }) => {
    const {
        orderNumber,
        createdAt,
        firstName,
        lastName,
        phone,
        email,
        status,
        id,
    } = order;

    const navigate = useNavigate();

    const [changeStatusOpen, setChangeStatusOpen] = useState(false);

    const [updateOrderStatus, { isLoading: isLoadingUpdateStatus }] =
        useUpdateOrderStatusMutation();

    const handleChangeStatus = useCallback(
        async (payload: OrderStatusDto) => {
            await updateOrderStatus({
                id,
                status: payload,
            });
            setChangeStatusOpen(false);
        },
        [updateOrderStatus, id],
    );

    const handleViewMore = useCallback(() => {
        const path = configureUrlString(AppRoute.ADMIN_ORDER_$ID, {
            id: String(order.id),
        });
        navigate(path);
    }, [order.id, navigate]);

    const handleCopyToClipboard = useCallback(() => {
        void navigator.clipboard.writeText(orderNumber);
        toast.success('Order ID copied to clipboard');
    }, [orderNumber]);

    return (
        <div>
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
                        {}
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
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="h-8 w-8"
                                    >
                                        <MoreVertical className="h-3.5 w-3.5" />
                                        <span className="sr-only">More</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        onClick={() =>
                                            setChangeStatusOpen(true)
                                        }
                                    >
                                        Change status
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>Get PDF</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
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
                        <div className="font-semibold">
                            Customer Information
                        </div>
                        <dl className="grid gap-3">
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">
                                    Customer
                                </dt>
                                <dd>
                                    {firstName} {lastName}
                                </dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">Email</dt>
                                <dd>
                                    <a href="mailto:">{email}</a>
                                </dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">Phone</dt>
                                <dd>
                                    <a href="tel:">{phone}</a>
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
            <ChangeStatusDialog
                open={changeStatusOpen}
                onOpenChange={setChangeStatusOpen}
                onSubmit={handleChangeStatus}
                status={status}
                isLoading={isLoadingUpdateStatus}
            />
        </div>
    );
};

export { OrderCard };
