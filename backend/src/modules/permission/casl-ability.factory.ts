import { createMongoAbility } from '@casl/ability';
import { UserResponseDto } from '@modules/users/types/types';
import { Injectable } from '@nestjs/common';

import { Permission } from './entities/entities';
import { PermissionService } from './permission.service';
import { type AppAbility } from './types/types';

@Injectable()
export class CaslAbilityFactory {
    constructor(private readonly permissionService: PermissionService) {}

    async createForUser(user: UserResponseDto) {
        const dbPermissions: Permission[] =
            await this.permissionService.findAllPermissionsOfUser(user);
        const caslPermissions = dbPermissions.map((permission) => ({
            action: permission.action,
            subject: permission.subject.name,
        }));

        return createMongoAbility<AppAbility>(caslPermissions);
    }
}
