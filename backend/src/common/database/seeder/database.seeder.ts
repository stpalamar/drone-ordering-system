import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { PublicFile } from '@modules/files/entities/public-file.entity';
import {
    Permission,
    Role,
    Subject,
} from '@modules/permission/entities/entities';
import {
    PermissionAction,
    PermissionSubject,
} from '@modules/permission/enums/enums';
import { Product } from '@modules/products/entities/product.entity';
import { ProductPrice } from '@modules/products/entities/product-price.entity';
import { User } from '@modules/users/entities/user.entity';
import { UserDetails } from '@modules/users/entities/user-details.entity';

export class DatabaseSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        const adminRole = em.create(Role, {
            name: 'admin',
        });
        const managerRole = em.create(Role, {
            name: 'manager',
        });
        const userRole = em.create(Role, {
            name: 'user',
        });

        const allSubject = em.create(Subject, {
            name: PermissionSubject.ALL,
        });
        em.create(Subject, {
            name: PermissionSubject.USER,
        });
        const productSubject = em.create(Subject, {
            name: PermissionSubject.PRODUCT,
        });
        const orderSubject = em.create(Subject, {
            name: PermissionSubject.ORDER,
        });
        const fileSubject = em.create(Subject, {
            name: PermissionSubject.FILE,
        });

        const manageAll = em.create(Permission, {
            action: PermissionAction.MANAGE,
            subject: allSubject,
        });

        const readProduct = em.create(Permission, {
            action: PermissionAction.READ,
            subject: productSubject,
        });

        const createOrder = em.create(Permission, {
            action: PermissionAction.CREATE,
            subject: orderSubject,
        });
        const readOrder = em.create(Permission, {
            action: PermissionAction.READ,
            subject: orderSubject,
        });
        const updateOrder = em.create(Permission, {
            action: PermissionAction.UPDATE,
            subject: orderSubject,
        });
        const deleteOrder = em.create(Permission, {
            action: PermissionAction.DELETE,
            subject: orderSubject,
        });

        const createFile = em.create(Permission, {
            action: PermissionAction.CREATE,
            subject: fileSubject,
        });
        const readFile = em.create(Permission, {
            action: PermissionAction.READ,
            subject: fileSubject,
        });

        const readOwnOrder = em.create(Permission, {
            action: PermissionAction.READ,
            subject: orderSubject,
            condition: {
                'customerId': '${id}',
            },
        });

        managerRole.permissions.add([
            readProduct,
            createOrder,
            readOrder,
            updateOrder,
            deleteOrder,
            readFile,
            createFile,
        ]);

        adminRole.permissions.add(manageAll);

        userRole.permissions.add(
            readOwnOrder,
            readProduct,
            createOrder,
            createFile,
            readFile,
        );

        const adminUserDetails = em.create(UserDetails, {
            firstName: 'John',
            lastName: 'Wick',
            phone: '0123456789',
            dateOfBirth: new Date('2000-01-01'),
            avatar: null,
        });

        const managerUserDetails = em.create(UserDetails, {
            firstName: 'Jack',
            lastName: 'Doe',
            phone: '0123456789',
            dateOfBirth: new Date('2001-01-01'),
            avatar: null,
        });

        const userDetails = em.create(UserDetails, {
            firstName: 'Michael',
            lastName: 'Doe',
            phone: '0123456789',
            dateOfBirth: new Date('2002-01-01'),
            avatar: null,
        });

        em.create(User, {
            email: 'admin@drone.com',
            password: 'admin123',
            role: adminRole,
            details: adminUserDetails,
            isEmailConfirmed: true,
        });

        em.create(User, {
            email: 'manager@mail.com',
            password: 'test123',
            role: managerRole,
            details: managerUserDetails,
            isEmailConfirmed: true,
        });

        em.create(User, {
            email: 'michael@mail.com',
            password: 'test123',
            role: userRole,
            details: userDetails,
            isEmailConfirmed: true,
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

        const productPrice1 = em.create(ProductPrice, {
            basePrice: 999,
            lengthUnitPrice: 10,
            widthUnitPrice: 10,
            payloadCapacityUnitPrice: 10,
            flightDistanceUnitPrice: 10,
            flightTimeUnitPrice: 10,
            additionalEquipmentPrices: JSON.stringify({
                camera: 10,
                thermographicCamera: 10,
                nightVision: 10,
                parachute: 10,
                autopilot: 10,
                targetIdentification: 10,
                gps: 10,
            }),
            colorPrice: 10,
            coatingTexturePrice: 10,
        });

        const productPrice2 = em.create(ProductPrice, {
            basePrice: 1999,
            lengthUnitPrice: 10,
            widthUnitPrice: 10,
            payloadCapacityUnitPrice: 10,
            flightDistanceUnitPrice: 10,
            flightTimeUnitPrice: 10,
            additionalEquipmentPrices: JSON.stringify({
                camera: 10,
                thermographicCamera: 10,
                nightVision: 10,
                parachute: 10,
                autopilot: 10,
                targetIdentification: 10,
                gps: 10,
            }),
            colorPrice: 10,
            coatingTexturePrice: 10,
        });

        const productPrice3 = em.create(ProductPrice, {
            basePrice: 1599,
            lengthUnitPrice: 10,
            widthUnitPrice: 10,
            payloadCapacityUnitPrice: 10,
            flightDistanceUnitPrice: 10,
            flightTimeUnitPrice: 10,
            additionalEquipmentPrices: JSON.stringify({
                camera: 10,
                thermographicCamera: 10,
                nightVision: 10,
                parachute: 10,
                autopilot: 10,
                targetIdentification: 10,
                gps: 10,
            }),
            colorPrice: 10,
            coatingTexturePrice: 10,
        });

        const productPrice4 = em.create(ProductPrice, {
            basePrice: 1299,
            lengthUnitPrice: 10,
            widthUnitPrice: 10,
            payloadCapacityUnitPrice: 10,
            flightDistanceUnitPrice: 10,
            flightTimeUnitPrice: 10,
            additionalEquipmentPrices: JSON.stringify({
                camera: 10,
                thermographicCamera: 10,
                nightVision: 10,
                parachute: 10,
                autopilot: 10,
                targetIdentification: 10,
                gps: 10,
            }),
            colorPrice: 10,
            coatingTexturePrice: 10,
        });

        const productPrice5 = em.create(ProductPrice, {
            basePrice: 2599,
            lengthUnitPrice: 10,
            widthUnitPrice: 10,
            payloadCapacityUnitPrice: 10,
            flightDistanceUnitPrice: 10,
            flightTimeUnitPrice: 10,
            additionalEquipmentPrices: JSON.stringify({
                camera: 10,
                thermographicCamera: 10,
                nightVision: 10,
                parachute: 10,
                autopilot: 10,
                targetIdentification: 10,
                gps: 10,
            }),
            colorPrice: 10,
            coatingTexturePrice: 10,
        });

        const productPrice6 = em.create(ProductPrice, {
            basePrice: 3299,
            lengthUnitPrice: 10,
            widthUnitPrice: 10,
            payloadCapacityUnitPrice: 10,
            flightDistanceUnitPrice: 10,
            flightTimeUnitPrice: 10,
            additionalEquipmentPrices: JSON.stringify({
                camera: 10,
                thermographicCamera: 10,
                nightVision: 10,
                parachute: 10,
                autopilot: 10,
                targetIdentification: 10,
                gps: 10,
            }),
            colorPrice: 10,
            coatingTexturePrice: 10,
        });

        const productPrice7 = em.create(ProductPrice, {
            basePrice: 4599,
            lengthUnitPrice: 10,
            widthUnitPrice: 10,
            payloadCapacityUnitPrice: 10,
            flightDistanceUnitPrice: 10,
            flightTimeUnitPrice: 10,
            additionalEquipmentPrices: JSON.stringify({
                camera: 10,
                thermographicCamera: 10,
                nightVision: 10,
                parachute: 10,
                autopilot: 10,
                targetIdentification: 10,
                gps: 10,
            }),
            colorPrice: 10,
            coatingTexturePrice: 10,
        });

        const productPrice8 = em.create(ProductPrice, {
            basePrice: 6599,
            lengthUnitPrice: 10,
            widthUnitPrice: 10,
            payloadCapacityUnitPrice: 10,
            flightDistanceUnitPrice: 10,
            flightTimeUnitPrice: 10,
            additionalEquipmentPrices: JSON.stringify({
                camera: 10,
                thermographicCamera: 10,
                nightVision: 10,
                parachute: 10,
                autopilot: 10,
                targetIdentification: 10,
                gps: 10,
            }),
            colorPrice: 10,
            coatingTexturePrice: 10,
        });

        const productPrice9 = em.create(ProductPrice, {
            basePrice: 5599,
            lengthUnitPrice: 10,
            widthUnitPrice: 10,
            payloadCapacityUnitPrice: 10,
            flightDistanceUnitPrice: 10,
            flightTimeUnitPrice: 10,
            additionalEquipmentPrices: JSON.stringify({
                camera: 10,
                thermographicCamera: 10,
                nightVision: 10,
                parachute: 10,
                autopilot: 10,
                targetIdentification: 10,
                gps: 10,
            }),
            colorPrice: 10,
            coatingTexturePrice: 10,
        });

        const productPrice10 = em.create(ProductPrice, {
            basePrice: 6899,
            lengthUnitPrice: 10,
            widthUnitPrice: 10,
            payloadCapacityUnitPrice: 10,
            flightDistanceUnitPrice: 10,
            flightTimeUnitPrice: 10,
            additionalEquipmentPrices: JSON.stringify({
                camera: 10,
                thermographicCamera: 10,
                nightVision: 10,
                parachute: 10,
                autopilot: 10,
                targetIdentification: 10,
                gps: 10,
            }),
            colorPrice: 10,
            coatingTexturePrice: 10,
        });

        em.create(Product, {
            purpose: 'Photo/video',
            wingsType: 'Quadcopter',
            price: productPrice1,
            image: photo1,
        });
        em.create(Product, {
            purpose: 'Military',
            wingsType: 'Quadcopter',
            price: productPrice2,
            image: photo2,
        });
        em.create(Product, {
            purpose: 'Agriculture',
            wingsType: 'Quadcopter',
            price: productPrice3,
            image: photo3,
        });
        em.create(Product, {
            purpose: 'Delivery',
            wingsType: 'Quadcopter',
            price: productPrice4,
            image: photo4,
        });
        em.create(Product, {
            purpose: 'Military',
            wingsType: 'Hexacopter',
            price: productPrice5,
            image: photo5,
        });
        em.create(Product, {
            purpose: 'Photo/video',
            wingsType: 'Octocopter',
            price: productPrice6,
            image: photo6,
        });
        em.create(Product, {
            purpose: 'Agriculture',
            wingsType: 'Fixed-wing',
            price: productPrice7,
            image: photo7,
        });
        em.create(Product, {
            purpose: 'Delivery',
            wingsType: 'Single-rotor',
            price: productPrice8,
            image: photo8,
        });
        em.create(Product, {
            purpose: 'Military',
            wingsType: 'Fixed-wing VTOL',
            price: productPrice9,
            image: photo9,
        });
        em.create(Product, {
            purpose: 'Military',
            wingsType: 'Fixed-wing',
            price: productPrice10,
            image: photo10,
        });
    }
}
