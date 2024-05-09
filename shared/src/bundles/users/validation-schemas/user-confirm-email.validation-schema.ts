import { z } from 'zod';

import { userDetailsValidationSchema } from './user-details.validation-schema.js';

const userConfirmEmailValidationSchema = z.object({
    userDetails: userDetailsValidationSchema,
    token: z.string(),
});

export { userConfirmEmailValidationSchema };
