import { type OrderItemDto } from './order-item-dto.type.js';

type OrderRequestDto = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    items: OrderItemDto[];
};

export { type OrderRequestDto };
