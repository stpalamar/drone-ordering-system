import { type OrderItemPayload } from './order-item-payload.type.js';

type CreateOrderPayload = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    items: OrderItemPayload[];
};

export { type CreateOrderPayload };
