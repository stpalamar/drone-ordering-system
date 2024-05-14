import { Loader } from '~/bundles/common/components/components.js';
import { Button } from '~/bundles/common/components/ui/button.js';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '~/bundles/common/components/ui/dialog.js';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '~/bundles/common/components/ui/form.js';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '~/bundles/common/components/ui/select.js';
import { zodResolver } from '~/bundles/common/helpers/helpers.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { OrderStatus } from '~/bundles/orders/enums/enums.js';
import { type OrderStatusDto } from '~/bundles/orders/types/types.js';
import { updateOrderStatusValidationSchema } from '~/bundles/orders/validation-schemas/validation-schemas.js';

import { getOrderStatusString } from '../../helpers/helpers.js';

type Properties = {
    onSubmit: (payload: OrderStatusDto) => Promise<void>;
    status: ValueOf<typeof OrderStatus>;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    isLoading: boolean;
};

const ChangeStatusDialog: React.FC<Properties> = ({
    status,
    onSubmit,
    open,
    onOpenChange,
    isLoading,
}) => {
    const form = useAppForm<OrderStatusDto>({
        resolver: zodResolver(updateOrderStatusValidationSchema),
        defaultValues: {
            status,
        },
    });

    const handleSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void form.handleSubmit(onSubmit)(event_);
        },
        [form, onSubmit],
    );
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Order status</DialogTitle>
                    <DialogDescription>
                        Select new order status
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={handleSubmit}>
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New status</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger
                                                id="status"
                                                aria-label="Select status"
                                            >
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(OrderStatus).map(
                                                (status) => (
                                                    <SelectItem
                                                        key={status}
                                                        value={status}
                                                    >
                                                        {getOrderStatusString(
                                                            status,
                                                        )}
                                                    </SelectItem>
                                                ),
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <Button onClick={handleSubmit} className="w-24">
                        {isLoading ? <Loader variant="secondary" /> : 'Save'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export { ChangeStatusDialog };
