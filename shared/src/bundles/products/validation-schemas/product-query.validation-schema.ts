import { z } from 'zod';

import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../../../constants/constants.js';
import { SortQuery } from '../../../enums/enums.js';

const productQueryValidationSchema = z.object({
    page: z.coerce.number().nonnegative().default(DEFAULT_PAGE),
    limit: z.coerce.number().nonnegative().default(DEFAULT_LIMIT),
    isActive: z
        .string()
        .toLowerCase()
        .transform((value) => value === 'true')
        .pipe(z.boolean()),
    dateSort: z.nativeEnum(SortQuery).default(SortQuery.DESC),
    totalSalesSort: z.nativeEnum(SortQuery).default(SortQuery.DESC),
});

export { productQueryValidationSchema };
