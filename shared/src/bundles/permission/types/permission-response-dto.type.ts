import { type ValueOf } from '../../../types/value-of.type.js';
import {
    type PermissionAction,
    type PermissionSubject,
} from '../permission.js';

type PermissionResponseDto = {
    id: number;
    action: ValueOf<typeof PermissionAction>;
    subject: ValueOf<typeof PermissionSubject>;
    condition: Record<string, unknown> | null;
};

export { type PermissionResponseDto };
