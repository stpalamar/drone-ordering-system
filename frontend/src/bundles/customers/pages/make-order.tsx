import { Loader } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppSelector,
    useCallback,
    useNavigate,
} from '~/bundles/common/hooks/hooks.js';
import { useCreateOrderMutation } from '~/bundles/orders/orders-api.js';
import { type OrderRequestDto } from '~/bundles/orders/types/types.js';
import { useGetProductTypesQuery } from '~/bundles/products/products-api.js';

import { MakeOrderForm } from '../components/components.js';

const MakeOrder: React.FC = () => {
    const { user } = useAppSelector(({ auth }) => auth);

    const { data, isLoading: isLoadingTypes } = useGetProductTypesQuery();

    const [createOrder, { isLoading: isLoadingMutation }] =
        useCreateOrderMutation();

    const navigate = useNavigate();

    const handleMakeOrder = useCallback(
        async (payload: OrderRequestDto): Promise<void> => {
            await createOrder(payload);
            void navigate(AppRoute.MY_ORDERS);
        },
        [navigate, createOrder],
    );

    return (
        <main className="grid flex-1 items-start justify-center gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 my-4">
            <div className="flex flex-col gap-4 lg:gap-8">
                {isLoadingTypes || !user ? (
                    <Loader size="large" isOverflow />
                ) : (
                    <MakeOrderForm
                        isLoadingMutation={isLoadingMutation}
                        onSubmit={handleMakeOrder}
                        productTypes={data ?? null}
                        user={user}
                    />
                )}
            </div>
        </main>
    );
};

export { MakeOrder };
