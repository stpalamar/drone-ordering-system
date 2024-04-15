import * as yup from 'yup';

import { UserValidationMessage, UserValidationRule } from '../enums/enums.js';

const userSignInValidationSchema = yup.object({
    email: yup
        .string()
        .email(UserValidationMessage.EMAIL_INVALID)
        .required(UserValidationMessage.EMAIL_REQUIRED),
    password: yup
        .string()
        .min(
            UserValidationRule.PASSWORD.MIN_LENGTH,
            UserValidationMessage.PASSWORD_MIN_LENGTH,
        )
        .max(
            UserValidationRule.PASSWORD.MAX_LENGTH,
            UserValidationMessage.PASSWORD_MAX_LENGTH,
        )
        .required(UserValidationMessage.PASSWORD_REQUIRED),
});

export { userSignInValidationSchema };
