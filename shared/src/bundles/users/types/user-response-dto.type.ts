import { type PermissionResponseDto } from '../../permission/permission.js';
import { type UserDetailsDto } from './user-details-dto.type.js';

type UserResponseDto = {
    id: number;
    email: string;
    role: string;
    details: UserDetailsDto | null;
    permissions: PermissionResponseDto[];
    deletedAt: string | null;
};

export { type UserResponseDto };
