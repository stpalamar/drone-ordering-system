import { type ValueOf } from '../../../types/value-of.type.js';
import { type UserResponseDto } from '../../users/users.js';
import { type OrderStatus } from '../enums/enums.js';
import { type OrderItemDto } from './order-item-dto.type.js';

type OrderResponseDto = {
    id: number;
    orderNumber: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    status: ValueOf<typeof OrderStatus>;
    items: OrderItemDto[];
    manager: UserResponseDto | null;
    customer: UserResponseDto | null;
    chatId: number | null;
    totalPrice: number;
    createdAt: string;
};

export { type OrderResponseDto };
