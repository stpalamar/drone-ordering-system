import { z } from 'zod';

import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../../../constants/constants.js';
import { Period } from '../../../enums/enums.js';
import { type ValueOf } from '../../../types/types.js';
import { OrderStatus } from '../orders.js';

const orderQueryValidationSchema = z.object({
    page: z.coerce.number().nonnegative().default(DEFAULT_PAGE),
    limit: z.coerce.number().nonnegative().default(DEFAULT_LIMIT),
    status: z
        .string()
        .transform((value) => value.split(','))
        .refine((values) =>
            values.every((value) =>
                Object.values(OrderStatus).includes(
                    value as ValueOf<typeof OrderStatus>,
                ),
            ),
        )
        .nullable()
        .default(null),
    period: z.nativeEnum(Period).default(Period.ALL),
});

export { orderQueryValidationSchema };
