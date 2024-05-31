import { type UserResponseDto } from '../../users/users.js';

type TopManagerForPeriod = {
    week: {
        manager: UserResponseDto;
        amountOfOrders: number;
    } | null;
    month: {
        manager: UserResponseDto;
        amountOfOrders: number;
    } | null;
    year: {
        manager: UserResponseDto;
        amountOfOrders: number;
    } | null;
};

export { type TopManagerForPeriod };
