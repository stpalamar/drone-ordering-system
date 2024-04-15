import * as yup from 'yup';

import { UserValidationMessage } from '../enums/user-validation-message.enum.js';
import { userSignInValidationSchema } from './user-sign-in.validation-schema.js';

const userSignUpValidationSchema = userSignInValidationSchema.shape({
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref('password')], UserValidationMessage.PASSWORD_MATCH),
});

export { userSignUpValidationSchema };
