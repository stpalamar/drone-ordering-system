import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { UserResponseDto } from '@modules/users/types/types';
import { Injectable } from '@nestjs/common';

import { Permission, Role } from './entities/entities';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: EntityRepository<Role>,
    ) {}

    async findAllPermissionsOfUser(user: UserResponseDto) {
        const roleWithPermissions = await this.roleRepository.findOne(
            { name: user.role },
            { populate: ['permissions', 'permissions.subject'] },
        );
        return roleWithPermissions?.permissions.getItems() as Permission[];
    }
}
