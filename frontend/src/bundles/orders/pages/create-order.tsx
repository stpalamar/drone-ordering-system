import { ChevronLeft } from 'lucide-react';

import { Loader } from '~/bundles/common/components/components.js';
import { Button } from '~/bundles/common/components/ui/button.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useCallback, useNavigate } from '~/bundles/common/hooks/hooks.js';
import { CreateOrderForm } from '~/bundles/orders/components/components.js';
import { type OrderRequestDto } from '~/bundles/orders/types/types.js';
import { useGetProductTypesQuery } from '~/bundles/products/products-api.js';

import { useCreateOrderMutation } from '../orders-api.js';

const CreateOrder: React.FC = () => {
    const { data, isLoading: isLoadingTypes } = useGetProductTypesQuery();

    const [createOrder, { isLoading: isLoadingMutation }] =
        useCreateOrderMutation();

    const navigate = useNavigate();

    const handleCreateOrder = useCallback(
        async (payload: OrderRequestDto): Promise<void> => {
            await createOrder(payload);
            void navigate(AppRoute.ORDERS);
        },
        [navigate, createOrder],
    );

    const handleBack = useCallback(() => {
        navigate(AppRoute.ORDERS);
    }, [navigate]);

    return (
        <main className="grid flex-1 items-start justify-center gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="grid flex-1 auto-rows-max gap-4 w-[59rem]">
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
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        New order
                    </h1>
                </div>
                <div className="flex flex-col gap-4 lg:gap-8">
                    {isLoadingTypes ? (
                        <Loader size="large" isOverflow />
                    ) : (
                        <CreateOrderForm
                            onSubmit={handleCreateOrder}
                            productTypes={data ?? null}
                            isLoadingMutation={isLoadingMutation}
                        />
                    )}
                </div>
            </div>
        </main>
    );
};

export { CreateOrder };
