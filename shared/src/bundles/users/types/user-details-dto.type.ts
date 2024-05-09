import { type FileResponseDto } from '../../files/files.js';

type UserDetailsDto = {
    firstName: string;
    lastName: string;
    phone: string;
    dateOfBirth: string;
    avatar: FileResponseDto | null;
};

export { type UserDetailsDto };
