import { type UserDetailsDto } from '~/bundles/users/types/types.js';

const DEFAULT_USER_DETAILS_PAYLOAD: UserDetailsDto = {
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    avatar: null,
};

export { DEFAULT_USER_DETAILS_PAYLOAD };
