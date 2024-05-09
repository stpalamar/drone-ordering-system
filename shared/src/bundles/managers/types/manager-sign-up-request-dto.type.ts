import { type UserSignUpRequestDto } from '../../users/users.js';

type ManagerSignUpRequestDto = UserSignUpRequestDto & {
    token: string;
};

export { type ManagerSignUpRequestDto };
