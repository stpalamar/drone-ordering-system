import { type UserSignInRequestDto } from './user-sign-in-request-dto.type.js';

type UserSignUpRequestDto = UserSignInRequestDto & {
    passwordConfirm: string;
};

export { type UserSignUpRequestDto };
