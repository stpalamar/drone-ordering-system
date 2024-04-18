import { EntityManager } from '@mikro-orm/postgresql';
import { User } from '@modules/users/user.entity';
import { Injectable } from '@nestjs/common';

import { Permission, Role } from './entities/entities';

@Injectable()
export class PermissionService {
    constructor(private readonly em: EntityManager) {}

    async findAllPermissionsOfUser(user: User) {
        const roleWithPermissions = await this.em.findOne(
            Role,
            { id: user.role.id },
            { populate: ['permissions'] },
        );
        return roleWithPermissions?.permissions.getItems() as Permission[];
    }
}
