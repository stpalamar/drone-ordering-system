import { z } from 'zod';

import { UserValidationMessage } from '../../users/enums/enums.js';
import { userSignInValidationSchema } from '../../users/users.js';

const managerSignUpValidationSchema = userSignInValidationSchema
    .extend({
        passwordConfirm: z.string().trim(),
        token: z.string().trim(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: UserValidationMessage.PASSWORD.MATCH,
        path: ['passwordConfirm'],
    });

export { managerSignUpValidationSchema };
