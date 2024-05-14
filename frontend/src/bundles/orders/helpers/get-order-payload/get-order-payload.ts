import { type CreateOrderPayload } from '~/bundles/orders/components/create-order-form/types/types.js';
import { type OrderResponseDto } from '~/bundles/orders/types/types.js';

const getOrderPayload = (order: OrderResponseDto): CreateOrderPayload => {
    return {
        firstName: order.firstName,
        lastName: order.lastName,
        phone: order.phone,
        email: order.email,
        items: order.items.map((item) => ({
            ...item,
            additionalInfo: item.additionalInfo ?? '',
        })),
    };
};

export { getOrderPayload };
