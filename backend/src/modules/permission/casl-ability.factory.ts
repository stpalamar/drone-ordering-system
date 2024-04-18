import { createMongoAbility, MongoAbility } from '@casl/ability';
import { ValueOf } from '@common/types/types';
import { User } from '@modules/users/user.entity';
import { Injectable } from '@nestjs/common';

import { Permission } from './entities/entities';
import { PermissionAction } from './enums/enums';
import { PermissionService } from './permission.service';

export type PermissionSubjectType = any;

export type AppAbility = MongoAbility<
    [ValueOf<typeof PermissionAction>, PermissionSubjectType]
>;

@Injectable()
export class CaslAbilityFactory {
    constructor(private readonly permissionService: PermissionService) {}

    async createForUser(user: User) {
        const dbPermissions: Permission[] =
            await this.permissionService.findAllPermissionsOfUser(user);
        const caslPermissions = dbPermissions.map((permission) => ({
            action: permission.action,
            subject: permission.subject.name,
        }));

        return createMongoAbility<AppAbility>(caslPermissions);
    }
}
