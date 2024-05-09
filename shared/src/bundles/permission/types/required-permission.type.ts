import { type ValueOf } from '../../../types/types.js';
import {
    type PermissionAction,
    type PermissionSubject,
} from '../enums/enums.js';

type RequiredPermission = [
    ValueOf<typeof PermissionAction>,
    ValueOf<typeof PermissionSubject>,
];

export { type RequiredPermission };
