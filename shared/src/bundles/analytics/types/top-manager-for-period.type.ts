import { type UserResponseDto } from '../../users/users.js';

type TopManagerForPeriod = {
    week: {
        manager: UserResponseDto;
        amountOfOrders: number;
    };
    month: {
        manager: UserResponseDto;
        amountOfOrders: number;
    };
    year: {
        manager: UserResponseDto;
        amountOfOrders: number;
    };
};

export { type TopManagerForPeriod };
