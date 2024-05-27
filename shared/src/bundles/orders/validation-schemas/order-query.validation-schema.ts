import { z } from 'zod';

import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../../../constants/constants.js';
import { Period } from '../../../enums/enums.js';
import { AssignedType, OrderStatus } from '../orders.js';

const orderQueryValidationSchema = z.object({
    page: z.coerce.number().nonnegative().default(DEFAULT_PAGE),
    limit: z.coerce.number().nonnegative().default(DEFAULT_LIMIT),
    status: z.nativeEnum(OrderStatus).or(z.null()).default(null),
    period: z.nativeEnum(Period).default(Period.ALL),
    assigned: z.nativeEnum(AssignedType).default(AssignedType.ALL),
});

export { orderQueryValidationSchema };
