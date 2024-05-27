import { Plus } from 'lucide-react';

import { Loader } from '~/bundles/common/components/components.js';
import { Button } from '~/bundles/common/components/ui/button.js';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '~/bundles/common/components/ui/card.js';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '~/bundles/common/components/ui/form.js';
import { Input } from '~/bundles/common/components/ui/input.js';
import { PhoneInput } from '~/bundles/common/components/ui/phone-input.js';
import { zodResolver } from '~/bundles/common/helpers/helpers.js';
import {
    useAppForm,
    useCallback,
    useFieldArray,
} from '~/bundles/common/hooks/hooks.js';
import { type OrderRequestDto } from '~/bundles/orders/types/types.js';
import { orderValidationSchema } from '~/bundles/orders/validation-schemas/validation-schemas.js';
import { type ProductTypesDto } from '~/bundles/products/types/types.js';

import { OrderItemForm } from './components/components.js';
import {
    DEFAULT_CREATE_ORDER_PAYLOAD,
    DEFAULT_ORDER_ITEM_PAYLOAD,
} from './constants/constants.js';
import { type CreateOrderPayload } from './types/create-order-payload.type.js';

type Properties = {
    onSubmit: (payload: OrderRequestDto) => Promise<void>;
    productTypes: ProductTypesDto | null;
    isLoadingMutation: boolean;
    disabled?: boolean;
    defaultValues?: CreateOrderPayload;
    isEdit?: boolean;
    setIsEditing?: (value: boolean) => void;
};

const CreateOrderForm: React.FC<Properties> = ({
    onSubmit,
    productTypes,
    isLoadingMutation,
    disabled = false,
    defaultValues = DEFAULT_CREATE_ORDER_PAYLOAD,
    isEdit = false,
    setIsEditing = (): void => {},
}) => {
    const form = useAppForm<
        CreateOrderPayload,
        CreateOrderPayload,
        OrderRequestDto
    >({
        resolver: zodResolver(orderValidationSchema),
        defaultValues: defaultValues,
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

    const handleReset = useCallback(() => {
        form.reset(defaultValues);
        setIsEditing(false);
    }, [defaultValues, form, setIsEditing]);

    const buttonLabel = isEdit ? 'Save changes' : 'Create order';

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit}>
                <div className="grid items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Customer details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6 grid-cols-2">
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        disabled={disabled}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    First name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter first name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        disabled={disabled}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter last name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        disabled={disabled}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    <PhoneInput
                                                        defaultCountry="UA"
                                                        placeholder="Enter phone number"
                                                        {...field}
                                                        className="w-full"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        disabled={disabled}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter email address"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    {fields.map((field, index) => (
                        <OrderItemForm
                            form={form}
                            key={field.id}
                            index={index}
                            onRemove={remove}
                            productTypes={productTypes}
                            disabled={disabled}
                        />
                    ))}
                </div>
                <div className="flex justify-center gap-3 mt-8">
                    <Button
                        type="submit"
                        className="flex items-center gap-2 min-w-28"
                        disabled={isLoadingMutation || disabled}
                    >
                        {isLoadingMutation ? (
                            <Loader variant="secondary" />
                        ) : (
                            buttonLabel
                        )}
                    </Button>
                    <Button
                        type="button"
                        onClick={() => {
                            append(DEFAULT_ORDER_ITEM_PAYLOAD);
                        }}
                        className="gap-1"
                        disabled={isLoadingMutation || disabled}
                    >
                        <Plus className="h-4 w-4" />
                        <span>Add item</span>
                    </Button>
                    {isEdit && (
                        <Button
                            onClick={handleReset}
                            type="button"
                            disabled={isLoadingMutation || disabled}
                        >
                            Cancel
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
};

export { CreateOrderForm };
