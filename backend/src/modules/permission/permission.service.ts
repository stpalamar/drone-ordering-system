import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { User } from '@modules/users/user.entity';
import { Injectable } from '@nestjs/common';

import { Permission, Role } from './entities/entities';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: EntityRepository<Role>,
    ) {}

    async findAllPermissionsOfUser(user: User) {
        const roleWithPermissions = await this.roleRepository.findOne(
            { id: user.role.id },
            { populate: ['permissions'] },
        );
        return roleWithPermissions?.permissions.getItems() as Permission[];
    }
}
