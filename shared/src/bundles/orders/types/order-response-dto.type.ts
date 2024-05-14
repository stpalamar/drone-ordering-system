import { type ValueOf } from '../../../types/value-of.type.js';
import { type OrderStatus } from '../enums/enums.js';
import { type OrderItemDto } from './order-item-dto.type.js';

type OrderResponseDto = {
    id: number;
    orderNumber: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    items: OrderItemDto[];
    status: ValueOf<typeof OrderStatus>;
    totalPrice: number;
    createdAt: string;
};

export { type OrderResponseDto };
