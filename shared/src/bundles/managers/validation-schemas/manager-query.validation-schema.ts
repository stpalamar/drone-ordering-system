import { z } from 'zod';

import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../../../constants/constants.js';

const managerQueryValidationSchema = z.object({
    page: z.coerce.number().nonnegative().default(DEFAULT_PAGE),
    limit: z.coerce.number().nonnegative().default(DEFAULT_LIMIT),
    isActive: z
        .string()
        .toLowerCase()
        .transform((value) => value === 'true')
        .pipe(z.boolean()),
});

export { managerQueryValidationSchema };
