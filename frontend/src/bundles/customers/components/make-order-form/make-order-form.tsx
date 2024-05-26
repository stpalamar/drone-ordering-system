import { Plus } from 'lucide-react';

import { Loader } from '~/bundles/common/components/components.js';
import { Button } from '~/bundles/common/components/ui/button.js';
import { Form } from '~/bundles/common/components/ui/form.js';
import { zodResolver } from '~/bundles/common/helpers/helpers.js';
import {
    useAppForm,
    useCallback,
    useEffect,
    useFieldArray,
} from '~/bundles/common/hooks/hooks.js';
import { OrderItemForm } from '~/bundles/orders/components/create-order-form/components/components.js';
import {
    DEFAULT_CREATE_ORDER_PAYLOAD,
    DEFAULT_ORDER_ITEM_PAYLOAD,
} from '~/bundles/orders/components/create-order-form/constants/constants.js';
import { type CreateOrderPayload } from '~/bundles/orders/components/create-order-form/types/types.js';
import { type OrderRequestDto } from '~/bundles/orders/types/types.js';
import { orderValidationSchema } from '~/bundles/orders/validation-schemas/validation-schemas.js';
import { type ProductTypesDto } from '~/bundles/products/types/types.js';
import { type UserResponseDto } from '~/bundles/users/types/types.js';

type Properties = {
    onSubmit: (payload: OrderRequestDto) => Promise<void>;
    productTypes: ProductTypesDto | null;
    isLoadingMutation: boolean;
    user: UserResponseDto;
};

const MakeOrderForm: React.FC<Properties> = ({
    onSubmit,
    productTypes,
    isLoadingMutation,
    user,
}) => {
    const form = useAppForm<
        CreateOrderPayload,
        CreateOrderPayload,
        OrderRequestDto
    >({
        resolver: zodResolver(orderValidationSchema),
        defaultValues: DEFAULT_CREATE_ORDER_PAYLOAD,
    });

    useEffect(() => {
        form.setValue('firstName', user.details?.firstName ?? '');
        form.setValue('lastName', user.details?.lastName ?? '');
        form.setValue('phone', user.details?.phone ?? '');
        form.setValue('email', user.email ?? '');
    });

    const { fields, append, remove } = useFieldArray<CreateOrderPayload>({
        control: form.control,
        name: 'items',
        rules: {
            minLength: 1,
            required: true,
        },
    });

    const handleSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void form.handleSubmit(onSubmit)(event_);
        },
        [form, onSubmit],
    );

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit}>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">
                    Make your custom drones
                </h3>
                <div className="grid items-start gap-4 lg:col-span-2 lg:gap-8">
                    {fields.map((field, index) => (
                        <OrderItemForm
                            form={form}
                            key={field.id}
                            index={index}
                            onRemove={remove}
                            productTypes={productTypes}
                            disabled={false}
                        />
                    ))}
                    <div className="flex justify-center gap-3 mt-8">
                        <Button
                            type="submit"
                            className="flex items-center gap-2 min-w-28"
                            disabled={isLoadingMutation}
                        >
                            {isLoadingMutation ? (
                                <Loader variant="secondary" />
                            ) : (
                                'Make order'
                            )}
                        </Button>
                        <Button
                            type="button"
                            onClick={() => {
                                append(DEFAULT_ORDER_ITEM_PAYLOAD);
                            }}
                            className="gap-1"
                            disabled={isLoadingMutation}
                        >
                            <Plus className="h-4 w-4" />
                            <span>Add item</span>
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export { MakeOrderForm };
