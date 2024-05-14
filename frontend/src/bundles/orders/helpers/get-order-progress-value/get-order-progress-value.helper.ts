import { type ValueOf } from '~/bundles/common/types/types.js';
import { OrderStatus } from '~/bundles/orders/enums/enums.js';

const getOrderProgressValue = (status: ValueOf<typeof OrderStatus>): number => {
    switch (status) {
        case OrderStatus.PENDING: {
            return 0;
        }
        case OrderStatus.CONFIRMED: {
            return 25;
        }
        case OrderStatus.IN_PROGRESS: {
            return 50;
        }
        case OrderStatus.READY: {
            return 75;
        }
        case OrderStatus.DELIVERED: {
            return 100;
        }
        case OrderStatus.CANCELLED: {
            return 0;
        }
        default: {
            return 0;
        }
    }
};

export { getOrderProgressValue };
