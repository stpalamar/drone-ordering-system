// eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
// @ts-ignore
import { isValidPhoneNumber } from 'react-phone-number-input';
import { z } from 'zod';

import { fileValidationSchema } from '../../files/files.js';
import { UserValidationMessage, UserValidationRule } from '../enums/enums.js';

const userDetailsValidationSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(
            UserValidationRule.FIRST_NAME.MIN_LENGTH,
            UserValidationMessage.FIRST_NAME.MIN_LENGTH,
        )
        .max(
            UserValidationRule.FIRST_NAME.MAX_LENGTH,
            UserValidationMessage.FIRST_NAME.MAX_LENGTH,
        ),
    lastName: z
        .string()
        .trim()
        .min(
            UserValidationRule.LAST_NAME.MIN_LENGTH,
            UserValidationMessage.LAST_NAME.MIN_LENGTH,
        )
        .max(
            UserValidationRule.LAST_NAME.MAX_LENGTH,
            UserValidationMessage.LAST_NAME.MAX_LENGTH,
        ),
    phone: z.string().refine(isValidPhoneNumber, {
        message: UserValidationMessage.PHONE.INVALID,
    }),
    dateOfBirth: z
        .string({
            required_error: UserValidationMessage.DATE_OF_BIRTH.REQUIRED,
        })
        .date(UserValidationMessage.DATE_OF_BIRTH.INVALID),
    avatar: fileValidationSchema.nullable(),
});

export { userDetailsValidationSchema };
