import { type UserDetailsDto } from './user-details-dto.type.js';

type UserConfirmEmailRequestDto = {
    userDetails: UserDetailsDto;
    token: string;
};

export { type UserConfirmEmailRequestDto };
