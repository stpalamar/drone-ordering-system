import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { PublicFile } from '@modules/files/entities/public-file.entity';
import {
    Permission,
    Role,
    Subject,
} from '@modules/permission/entities/entities';
import { PermissionAction } from '@modules/permission/enums/enums';
import { Product } from '@modules/products/entities/product.entity';

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

        const photo1 = em.create(PublicFile, {
            key: '6d38679f-7e1f-47db-ba9a-e68b2cd03a4d',
            url: 'https://drone-ordering-images.s3.eu-central-1.amazonaws.com/6d38679f-7e1f-47db-ba9a-e68b2cd03a4d',
        });
        const photo2 = em.create(PublicFile, {
            key: '6d38679f-7e1f-47db-ba9a-e68b2cd03a4d',
            url: 'https://drone-ordering-images.s3.eu-central-1.amazonaws.com/6d38679f-7e1f-47db-ba9a-e68b2cd03a4d',
        });
        const photo3 = em.create(PublicFile, {
            key: '6d38679f-7e1f-47db-ba9a-e68b2cd03a4d',
            url: 'https://drone-ordering-images.s3.eu-central-1.amazonaws.com/6d38679f-7e1f-47db-ba9a-e68b2cd03a4d',
        });
        const photo4 = em.create(PublicFile, {
            key: '6d38679f-7e1f-47db-ba9a-e68b2cd03a4d',
            url: 'https://drone-ordering-images.s3.eu-central-1.amazonaws.com/6d38679f-7e1f-47db-ba9a-e68b2cd03a4d',
        });
        const photo5 = em.create(PublicFile, {
            key: '6d38679f-7e1f-47db-ba9a-e68b2cd03a4d',
            url: 'https://drone-ordering-images.s3.eu-central-1.amazonaws.com/6d38679f-7e1f-47db-ba9a-e68b2cd03a4d',
        });
        const photo6 = em.create(PublicFile, {
            key: '6d38679f-7e1f-47db-ba9a-e68b2cd03a4d',
            url: 'https://drone-ordering-images.s3.eu-central-1.amazonaws.com/6d38679f-7e1f-47db-ba9a-e68b2cd03a4d',
        });
        const photo7 = em.create(PublicFile, {
            key: '6d38679f-7e1f-47db-ba9a-e68b2cd03a4d',
            url: 'https://drone-ordering-images.s3.eu-central-1.amazonaws.com/6d38679f-7e1f-47db-ba9a-e68b2cd03a4d',
        });
        const photo8 = em.create(PublicFile, {
            key: '6d38679f-7e1f-47db-ba9a-e68b2cd03a4d',
            url: 'https://drone-ordering-images.s3.eu-central-1.amazonaws.com/6d38679f-7e1f-47db-ba9a-e68b2cd03a4d',
        });
        const photo9 = em.create(PublicFile, {
            key: '6d38679f-7e1f-47db-ba9a-e68b2cd03a4d',
            url: 'https://drone-ordering-images.s3.eu-central-1.amazonaws.com/6d38679f-7e1f-47db-ba9a-e68b2cd03a4d',
        });
        const photo10 = em.create(PublicFile, {
            key: '6d38679f-7e1f-47db-ba9a-e68b2cd03a4d',
            url: 'https://drone-ordering-images.s3.eu-central-1.amazonaws.com/6d38679f-7e1f-47db-ba9a-e68b2cd03a4d',
        });

        em.create(Product, {
            purpose: 'Photo/video',
            wingsType: 'Quadcopter',
            basePrice: 999,
            image: photo1,
        });
        em.create(Product, {
            purpose: 'Military',
            wingsType: 'Quadcopter',
            basePrice: 1999,
            image: photo2,
        });
        em.create(Product, {
            purpose: 'Agriculture',
            wingsType: 'Quadcopter',
            basePrice: 1599,
            image: photo3,
        });
        em.create(Product, {
            purpose: 'Delivery',
            wingsType: 'Quadcopter',
            basePrice: 1299,
            image: photo4,
        });
        em.create(Product, {
            purpose: 'Military',
            wingsType: 'Hexacopter',
            basePrice: 2599,
            image: photo5,
        });
        em.create(Product, {
            purpose: 'Photo/video',
            wingsType: 'Octocopter',
            basePrice: 3299,
            image: photo6,
        });
        em.create(Product, {
            purpose: 'Agriculture',
            wingsType: 'Fixed-wing',
            basePrice: 4599,
            image: photo7,
        });
        em.create(Product, {
            purpose: 'Delivery',
            wingsType: 'Single-rotor',
            basePrice: 6599,
            image: photo8,
        });
        em.create(Product, {
            purpose: 'Military',
            wingsType: 'Fixed-wing VTOL',
            basePrice: 5599,
            image: photo9,
        });
        em.create(Product, {
            purpose: 'Military',
            wingsType: 'Fixed-wing',
            basePrice: 6899,
            image: photo10,
        });

        adminRole.permissions.add(manageAll);
    }
}
