import { z } from 'zod';

import { UserValidationMessage, UserValidationRule } from '../enums/enums.js';

const userSignInValidationSchema = z.object({
    email: z.string().trim().email(UserValidationMessage.EMAIL.INVALID),
    password: z
        .string()
        .trim()
        .min(
            UserValidationRule.PASSWORD.MIN_LENGTH,
            UserValidationMessage.PASSWORD.MIN_LENGTH,
        )
        .max(
            UserValidationRule.PASSWORD.MAX_LENGTH,
            UserValidationMessage.PASSWORD.MAX_LENGTH,
        ),
});

export { userSignInValidationSchema };
