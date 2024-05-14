import { type ValueOf } from '~/bundles/common/types/types.js';

import { type OrderStatus } from '../../enums/enums.js';

const getOrderStatusString = (status: ValueOf<typeof OrderStatus>): string => {
    return status.replace('_', ' ').toUpperCase();
};

export { getOrderStatusString };
