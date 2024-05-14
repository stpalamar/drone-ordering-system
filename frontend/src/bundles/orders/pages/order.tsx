import { ChevronLeft, Download, Pencil } from 'lucide-react';
import { toast } from 'sonner';

import { Loader, Navigate } from '~/bundles/common/components/components.js';
import { Alert, AlertTitle } from '~/bundles/common/components/ui/alert.js';
import { Badge } from '~/bundles/common/components/ui/badge.js';
import { Button } from '~/bundles/common/components/ui/button.js';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '~/bundles/common/components/ui/card.js';
import { Progress } from '~/bundles/common/components/ui/progress.js';
import { Separator } from '~/bundles/common/components/ui/separator.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { formatDateWithMonth } from '~/bundles/common/helpers/helpers.js';
import {
    useCallback,
    useNavigate,
    useParams,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { cn } from '~/bundles/common/lib/utils.js';
import { OrderStatus } from '~/bundles/orders/enums/enums.js';
import { useGetProductTypesQuery } from '~/bundles/products/products-api.js';

import {
    ChangeStatusDialog,
    CreateOrderForm,
} from '../components/components.js';
import {
    getOrderPayload,
    getOrderProgressValue,
    getOrderStatusString,
} from '../helpers/helpers.js';
import {
    useGetOrderByIdQuery,
    useUpdateOrderMutation,
    useUpdateOrderStatusMutation,
} from '../orders-api.js';
import { type OrderRequestDto, type OrderStatusDto } from '../types/types.js';

const Order: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [isEditing, setIsEditing] = useState(false);
    const [changeStatusOpen, setChangeStatusOpen] = useState(false);

    const { data: productsTypes, isLoading: isLoadingTypes } =
        useGetProductTypesQuery();

    const {
        data: order,
        isLoading,
        isError,
    } = useGetOrderByIdQuery(Number(id));

    const [updateOrderStatus, { isLoading: isLoadingUpdateStatus }] =
        useUpdateOrderStatusMutation();

    const [updateOrder, { isLoading: isLoadingUpdateOrder }] =
        useUpdateOrderMutation();

    const handleSaveOrder = useCallback(
        async (payload: OrderRequestDto) => {
            const result = await updateOrder({
                id: Number(id),
                item: payload,
            }).unwrap();
            setIsEditing(false);
            if (result) {
                toast.success('Order updated successfully');
            }
        },
        [updateOrder, setIsEditing, id],
    );

    const handleBack = useCallback(() => {
        navigate(AppRoute.ORDERS);
    }, [navigate]);

    const handleEnableEditing = useCallback(() => {
        setIsEditing((previous) => !previous);
    }, [setIsEditing]);

    const handleChangeStatus = useCallback(
        async (payload: OrderStatusDto) => {
            await updateOrderStatus({
                id: Number(id),
                status: payload,
            });
            setChangeStatusOpen(false);
        },
        [updateOrderStatus, id],
    );

    if (isLoading || !order || !productsTypes || isLoadingTypes) {
        return <Loader size="medium" isOverflow />;
    }

    if (isError) {
        return <Navigate to={AppRoute.ORDERS} />;
    }

    const orderProgress = getOrderProgressValue(order.status);

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={handleBack}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Button>
                    <h1 className="text-xl font-semibold tracking-tight truncate">
                        Order: {order.orderNumber.toUpperCase()}
                    </h1>
                    <Badge variant="outline" className="ml-auto sm:ml-0">
                        {formatDateWithMonth(new Date(order.createdAt))}
                    </Badge>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                    <div className="col-span-2 grid gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    <div className="flex justify-between">
                                        <span>Status</span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                setChangeStatusOpen(true)
                                            }
                                        >
                                            Change
                                        </Button>
                                        <ChangeStatusDialog
                                            open={changeStatusOpen}
                                            onOpenChange={setChangeStatusOpen}
                                            onSubmit={handleChangeStatus}
                                            status={order.status}
                                            isLoading={isLoadingUpdateStatus}
                                        />
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Progress value={orderProgress} />
                                <div className="flex mt-4 justify-between">
                                    {order.status === OrderStatus.CANCELLED ? (
                                        <Badge variant="destructive">
                                            {OrderStatus.CANCELLED.toUpperCase()}
                                        </Badge>
                                    ) : (
                                        Object.values(OrderStatus)
                                            .filter(
                                                (item) =>
                                                    item !=
                                                    OrderStatus.CANCELLED,
                                            )
                                            .map((status) => (
                                                <Badge
                                                    key={status}
                                                    variant="outline"
                                                    className={cn(
                                                        status ===
                                                            order.status &&
                                                            'text-green-500 border-green-500',
                                                    )}
                                                >
                                                    {getOrderStatusString(
                                                        status,
                                                    )}
                                                </Badge>
                                            ))
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                        <Separator />
                        <div>
                            <div className="flex gap-4 mb-4">
                                {isEditing ? (
                                    <Alert>
                                        <Pencil className="h-4 w-4 mr-2" />
                                        <AlertTitle>
                                            You are currently editing the order!
                                        </AlertTitle>
                                    </Alert>
                                ) : (
                                    <>
                                        <Button
                                            variant="secondary"
                                            onClick={handleEnableEditing}
                                        >
                                            <Pencil className="h-4 w-4 mr-2" />
                                            Edit
                                        </Button>
                                        <Button variant="secondary">
                                            <Download className="h-4 w-4  mr-2" />
                                            Get PDF
                                        </Button>
                                    </>
                                )}
                            </div>
                            <div className={cn(isEditing && 'border-blue-400')}>
                                <CreateOrderForm
                                    onSubmit={handleSaveOrder}
                                    isLoadingMutation={isLoadingUpdateOrder}
                                    productTypes={productsTypes}
                                    disabled={!isEditing}
                                    defaultValues={getOrderPayload(order)}
                                    isEdit
                                    setIsEditing={setIsEditing}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2 md:hidden">
                    <Button variant="outline" size="sm">
                        Discard
                    </Button>
                    <Button size="sm">Save Product</Button>
                </div>
            </div>
        </main>
    );
};

export { Order };
