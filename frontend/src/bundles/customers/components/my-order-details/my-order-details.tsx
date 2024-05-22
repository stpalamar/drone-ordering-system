import { Badge } from '~/bundles/common/components/ui/badge.js';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '~/bundles/common/components/ui/card.js';
import { Progress } from '~/bundles/common/components/ui/progress.js';
import { Separator } from '~/bundles/common/components/ui/separator.js';
import {
    capitalizeFirstLetter,
    formatPrice,
} from '~/bundles/common/helpers/helpers.js';
import { cn } from '~/bundles/common/lib/utils.js';
import { OrderStatus } from '~/bundles/orders/enums/enums.js';
import {
    getOrderProgressValue,
    getOrderStatusString,
} from '~/bundles/orders/helpers/helpers.js';
import { type OrderResponseDto } from '~/bundles/orders/types/types.js';

type Properties = {
    order: OrderResponseDto;
};

const MyOrderDetails: React.FC<Properties> = ({ order }) => {
    const { manager, items, status } = order;

    const orderProgress = getOrderProgressValue(order.status);

    return (
        <div className="col-span-2 grid gap-8 grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>
                        <div className="flex justify-between">
                            <span>Status</span>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <Progress value={orderProgress} />
                        <div className="flex mt-4 justify-between">
                            {status === OrderStatus.CANCELLED ? (
                                <Badge variant="destructive">
                                    {OrderStatus.CANCELLED.toUpperCase()}
                                </Badge>
                            ) : (
                                Object.values(OrderStatus)
                                    .filter(
                                        (item) => item != OrderStatus.CANCELLED,
                                    )
                                    .map((statusItem) => (
                                        <Badge
                                            key={statusItem}
                                            variant="outline"
                                            className={cn(
                                                'hidden',
                                                status === statusItem &&
                                                    'text-green-500 border-green-500 inline-flex',
                                            )}
                                        >
                                            {getOrderStatusString(statusItem)}
                                        </Badge>
                                    ))
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <div className="flex justify-between">
                            <span>Manager information</span>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-3">
                        {manager ? (
                            <dl className="grid gap-3">
                                <div className="flex items-center justify-between">
                                    <dt className="text-muted-foreground">
                                        Full name
                                    </dt>
                                    <dd>
                                        {manager.details?.firstName}{' '}
                                        {manager.details?.lastName}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="text-muted-foreground">
                                        Email
                                    </dt>
                                    <dd>
                                        <a href="mailto:">{manager.email}</a>
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="text-muted-foreground">
                                        Phone
                                    </dt>
                                    <dd>
                                        <a href="tel:">
                                            {manager.details?.phone}
                                        </a>
                                    </dd>
                                </div>
                            </dl>
                        ) : (
                            <div className="text-muted-foreground">
                                No manager assigned
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
            {items.map((item, index) => (
                <Card key={index}>
                    <CardHeader className="flex flex-col items-start bg-muted/50">
                        <CardTitle>
                            <div className="flex justify-between">
                                <span>Drone #{index + 1}</span>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <dl className="grid gap-3">
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">Type</dt>
                                <dd>
                                    {item.purpose} {item.wingsType}
                                </dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">
                                    Dimensions
                                </dt>
                                <dd>
                                    {item.width}x{item.length} cm
                                </dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">
                                    Payload capacity
                                </dt>
                                <dd>{item.payloadCapacity} kg</dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">
                                    Flight distance
                                </dt>
                                <dd>{item.flightDistance} km</dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">
                                    Flight time
                                </dt>
                                <dd>{item.flightTime} m</dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">
                                    Power source
                                </dt>
                                <dd>
                                    {capitalizeFirstLetter(item.powerSource)}
                                </dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">
                                    Material
                                </dt>
                                <dd>
                                    {capitalizeFirstLetter(item.materialType)}
                                </dd>
                            </div>
                        </dl>
                        <Separator className="my-4" />
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Price</span>
                            <span>{formatPrice(item.price)}</span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export { MyOrderDetails };
