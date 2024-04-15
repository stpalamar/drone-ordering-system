import * as yup from 'yup';

import { userSignInValidationSchema } from './user-sign-in.validation-schema.js';

const userSignUpValidationSchema = userSignInValidationSchema.shape({
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match'),
});

export { userSignUpValidationSchema };
