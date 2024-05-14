import { type ValueOf } from '../../../types/types.js';
import { type OrderStatus } from '../enums/enums.js';

type OrderStatusDto = {
    status: ValueOf<typeof OrderStatus>;
};

export { type OrderStatusDto };
