import { ChevronLeft } from 'lucide-react';

import { Chat } from '~/bundles/chats/components/components.js';
import { Loader, Navigate } from '~/bundles/common/components/components.js';
import { Badge } from '~/bundles/common/components/ui/badge.js';
import { Button } from '~/bundles/common/components/ui/button.js';
import { Card } from '~/bundles/common/components/ui/card.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { formatDateWithMonth } from '~/bundles/common/helpers/helpers.js';
import {
    useCallback,
    useNavigate,
    useParams,
} from '~/bundles/common/hooks/hooks.js';
import { useGetOrderByIdQuery } from '~/bundles/orders/orders-api.js';

import { MyOrderDetails } from '../components/components.js';

const CustomerOrder: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        data: order,
        isLoading,
        isError,
    } = useGetOrderByIdQuery(Number(id));

    const handleBack = useCallback(() => {
        navigate(AppRoute.ADMIN_ORDERS);
    }, [navigate]);

    if (isLoading) {
        return <Loader size="medium" isOverflow />;
    }

    if (isError || !order) {
        return <Navigate to={AppRoute.ADMIN_ORDERS} />;
    }

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
                    <MyOrderDetails order={order} />
                    {order.manager && order.manager.details && order.chatId && (
                        <Card className="h-[40rem] col-span-2 lg:col-span-1">
                            <Chat
                                chatId={order.chatId}
                                selectedUser={{
                                    id: order.manager.id,
                                    email: order.manager.email,
                                    firstName: order.manager.details.firstName,
                                    lastName: order.manager.details.lastName,
                                    avatarUrl: order.manager.details.avatar
                                        ? order.manager.details.avatar.url
                                        : null,
                                }}
                            />
                        </Card>
                    )}
                </div>
            </div>
        </main>
    );
};

export { CustomerOrder };
