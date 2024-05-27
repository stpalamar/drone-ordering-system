import { UserValidationRule } from './user-validation-rule.enum.js';

const { PASSWORD } = UserValidationRule;

const UserValidationMessage = {
    EMAIL: {
        REQUIRED: 'Email is required',
        INVALID: 'Email is invalid',
    },
    PASSWORD: {
        REQUIRED: 'Password is required',
        MIN_LENGTH: `Password must be at least ${PASSWORD.MIN_LENGTH} characters`,
        MAX_LENGTH: `Password must be at most ${PASSWORD.MAX_LENGTH} characters`,
        MATCH: 'Passwords must match',
    },
    FIRST_NAME: {
        REQUIRED: 'First name is required',
        MIN_LENGTH: `First name must be at least ${UserValidationRule.FIRST_NAME.MIN_LENGTH} characters`,
        MAX_LENGTH: `First name must be at most ${UserValidationRule.FIRST_NAME.MAX_LENGTH} characters`,
    },
    LAST_NAME: {
        REQUIRED: 'Last name is required',
        MIN_LENGTH: `Last name must be at least ${UserValidationRule.LAST_NAME.MIN_LENGTH} characters`,
        MAX_LENGTH: `Last name must be at most ${UserValidationRule.LAST_NAME.MAX_LENGTH} characters`,
    },
    PHONE: {
        REQUIRED: 'Phone is required',
        INVALID: 'Phone is invalid',
        LENGTH: `Phone must be ${UserValidationRule.PHONE.LENGTH} numbers`,
    },
    DATE_OF_BIRTH: {
        REQUIRED: 'Date of birth is required',
        INVALID: 'Date of birth should be YYYY-MM-DD',
    },
} as const;

export { UserValidationMessage };
