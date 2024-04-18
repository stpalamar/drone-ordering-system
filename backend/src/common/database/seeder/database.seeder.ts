import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import {
    Permission,
    Role,
    Subject,
} from '@modules/permission/entities/entities';
import { PermissionAction } from '@modules/permission/enums/enums';

export class DatabaseSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        const adminRole = em.create(Role, {
            name: 'admin',
        });
        em.create(Role, {
            name: 'manager',
        });
        em.create(Role, {
            name: 'user',
        });

        const allSubject = em.create(Subject, {
            name: 'all',
        });
        em.create(Subject, {
            name: 'User',
        });

        const manageAll = em.create(Permission, {
            action: PermissionAction.MANAGE,
            subject: allSubject,
        });

        adminRole.permissions.add(manageAll);
    }
}
