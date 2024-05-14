import { ChevronLeft, ChevronRight, Copy, MoreVertical } from 'lucide-react';

import { RouterOutlet } from '~/bundles/common/components/components.js';
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
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '~/bundles/common/components/ui/dropdown-menu.js';
import {
    PaginationContent,
    PaginationItem,
    PaginationNav,
} from '~/bundles/common/components/ui/pagination.js';
import { Separator } from '~/bundles/common/components/ui/separator.js';
import {
    configureUrlString,
    formatDateWithMonth,
} from '~/bundles/common/helpers/helpers.js';
import { useCallback, useNavigate } from '~/bundles/common/hooks/hooks.js';
import { type OrderResponseDto } from '~/bundles/orders/types/types.js';

import { AppRoute } from '../../../../../../shared/src/enums/app-route.enum.js';

type Properties = {
    order: OrderResponseDto;
};

const OrderCard: React.FC<Properties> = ({ order }) => {
    const { orderNumber, createdAt, firstName, lastName, phone, email } = order;

    const navigate = useNavigate();

    const handleViewMore = useCallback(() => {
        const path = configureUrlString(AppRoute.ORDER_$ID, {
            id: String(order.id),
        });
        navigate(path);
    }, [order.id, navigate]);

    return (
        <div>
            <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                        <CardTitle className="group flex items-center gap-2 text-lg">
                            Order {orderNumber}
                            <Button
                                size="icon"
                                variant="outline"
                                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                            >
                                <Copy className="h-3 w-3" />
                                <span className="sr-only">Copy Order ID</span>
                            </Button>
                        </CardTitle>
                        <CardDescription>
                            Date: {formatDateWithMonth(new Date(createdAt))}
                        </CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
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
                                <DropdownMenuItem>
                                    Change status
                                </DropdownMenuItem>
                                <DropdownMenuItem>Export</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Trash</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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
                                    <span>$250.00</span>
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
                    <PaginationNav className="ml-auto mr-0 w-auto">
                        <PaginationContent>
                            <PaginationItem>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-6 w-6"
                                >
                                    <ChevronLeft className="h-3.5 w-3.5" />
                                    <span className="sr-only">
                                        Previous Order
                                    </span>
                                </Button>
                            </PaginationItem>
                            <PaginationItem>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-6 w-6"
                                >
                                    <ChevronRight className="h-3.5 w-3.5" />
                                    <span className="sr-only">Next Order</span>
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </PaginationNav>
                </CardFooter>
            </Card>
            <RouterOutlet />
        </div>
    );
};

export { OrderCard };
