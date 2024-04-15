import { UserValidationRule } from './user-validation-rule.enum.js';

const { PASSWORD } = UserValidationRule;

const UserValidationMessage = {
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Email is invalid',
    PASSWORD_REQUIRED: 'Password is required',
    PASSWORD_MIN_LENGTH: `Password must be at least ${PASSWORD.MIN_LENGTH} characters`,
    PASSWORD_MAX_LENGTH: `Password must be at most ${PASSWORD.MAX_LENGTH} characters`,
    PASSWORD_MATCH: 'Passwords must match',
};

export { UserValidationMessage };
