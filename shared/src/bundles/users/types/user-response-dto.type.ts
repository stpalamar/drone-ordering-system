import { type PermissionResponseDto } from '../../permission/permission.js';

type UserResponseDto = {
    id: number;
    email: string;
    role: string;
    permissions: PermissionResponseDto[];
};

export { type UserResponseDto };
