import { ChevronLeft, Download, Pencil } from 'lucide-react';
import { toast } from 'sonner';

import { Chat } from '~/bundles/chats/components/components.js';
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
    useAppSelector,
    useCallback,
    useNavigate,
    useParams,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { cn } from '~/bundles/common/lib/utils.js';
import { OrderStatus } from '~/bundles/orders/enums/enums.js';
import { useGetProductTypesQuery } from '~/bundles/products/products-api.js';
import { UserRole } from '~/bundles/users/enums/enums.js';

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
    useAssignOrderMutation,
    useGenerateOrderPdfMutation,
    useGetOrderByIdQuery,
    useUpdateOrderMutation,
    useUpdateOrderStatusMutation,
} from '../orders-api.js';
import { type OrderRequestDto, type OrderStatusDto } from '../types/types.js';

const Order: React.FC = () => {
    const { user } = useAppSelector(({ auth }) => auth);
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

    const [assignOrder, { isLoading: isLoadingAssignOrder }] =
        useAssignOrderMutation();

    const [generateOrderPdf, { isLoading: isLoadingGeneratePdf }] =
        useGenerateOrderPdfMutation();

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
        navigate(AppRoute.ADMIN_ORDERS);
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

    const handleAssignOrder = useCallback(() => {
        void assignOrder(Number(id));
    }, [id, assignOrder]);

    const handleGeneratePdf = useCallback(() => {
        void generateOrderPdf(Number(id));
    }, [generateOrderPdf, id]);

    if (isLoading || isLoadingTypes) {
        return <Loader size="medium" isOverflow />;
    }

    if (isError || !order || !productsTypes) {
        return <Navigate to={AppRoute.ADMIN_ORDERS} />;
    }

    const orderProgress = getOrderProgressValue(order.status);

    const isUnassigned = order.manager === null;

    const isAssignedToMe = order.manager?.id === user?.id;

    const isAdmin = user?.role === UserRole.ADMIN;

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
                                            disabled={isUnassigned}
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
                            <div className="flex flex-col gap-4 mb-4">
                                {isAdmin &&
                                    !isUnassigned &&
                                    !isAssignedToMe && (
                                        <Alert>
                                            <AlertTitle>
                                                Manager:{' '}
                                                {
                                                    order.manager?.details
                                                        ?.firstName
                                                }{' '}
                                                {
                                                    order.manager?.details
                                                        ?.lastName
                                                }
                                            </AlertTitle>
                                        </Alert>
                                    )}
                                {isAssignedToMe && (
                                    <Alert className="flex flex-row items-center justify-between">
                                        <AlertTitle>
                                            You are manager of this order
                                        </AlertTitle>
                                    </Alert>
                                )}
                                {isUnassigned && (
                                    <Button
                                        onClick={handleAssignOrder}
                                        className="max-w-36"
                                        disabled={isLoadingAssignOrder}
                                    >
                                        {isLoadingAssignOrder ? (
                                            <Loader variant="secondary" />
                                        ) : (
                                            'Assign to me'
                                        )}
                                    </Button>
                                )}
                                <div className="grid gap-2 grid-cols-2 max-w-[20rem]">
                                    <Button
                                        variant="secondary"
                                        onClick={handleEnableEditing}
                                        disabled={isUnassigned || isEditing}
                                    >
                                        <Pencil className="h-4 w-4 mr-2" />
                                        Edit
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        onClick={handleGeneratePdf}
                                        disabled={
                                            isUnassigned ||
                                            isEditing ||
                                            isLoadingGeneratePdf
                                        }
                                    >
                                        {isLoadingGeneratePdf ? (
                                            <Loader />
                                        ) : (
                                            <>
                                                <Download className="h-4 w-4  mr-2" />
                                                Download PDF
                                            </>
                                        )}
                                    </Button>
                                </div>
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
                    {order.customer && order.chatId && order.manager && (
                        <Card className="h-[40rem] col-span-2 lg:col-span-1">
                            {order.customer.details && (
                                <Chat
                                    chatId={order.chatId}
                                    selectedUser={{
                                        id: order.customer.id,
                                        avatarUrl: order.customer.details.avatar
                                            ? order.customer.details.avatar.url
                                            : null,
                                        email: order.customer.email,
                                        firstName:
                                            order.customer.details.firstName,
                                        lastName:
                                            order.customer.details.lastName,
                                    }}
                                />
                            )}
                        </Card>
                    )}
                </div>
            </div>
        </main>
    );
};

export { Order };
