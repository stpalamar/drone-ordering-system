import { z } from 'zod';

import { UserValidationMessage } from '../enums/user-validation-message.enum.js';
import { userSignInValidationSchema } from './user-sign-in.validation-schema.js';

const userSignUpValidationSchema = userSignInValidationSchema
    .extend({
        passwordConfirm: z.string().trim(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: UserValidationMessage.PASSWORD.MATCH,
        path: ['passwordConfirm'],
    });

export { userSignUpValidationSchema };
