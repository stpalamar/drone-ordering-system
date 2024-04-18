import { ValueOf } from '@common/types/types';
import { CustomDecorator, SetMetadata } from '@nestjs/common';

import { PermissionSubjectType } from '../casl-ability.factory';
import { PermissionAction } from '../enums/enums';

export type RequiredPermission = [
    ValueOf<typeof PermissionAction>,
    PermissionSubjectType,
];
export const PERMISSION_CHECKER_KEY = 'permission_checker_params_key';
export const CheckPermissions = (
    ...params: RequiredPermission[]
): CustomDecorator<string> => SetMetadata(PERMISSION_CHECKER_KEY, params);
