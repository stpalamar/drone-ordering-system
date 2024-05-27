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
        const analyticsSubject = em.create(Subject, {
            name: PermissionSubject.ANALYTICS,
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

        const readAnalytics = em.create(Permission, {
            action: PermissionAction.READ,
            subject: analyticsSubject,
        });

        managerRole.permissions.add([
            readProduct,
            createOrder,
            readOrder,
            updateOrder,
            deleteOrder,
            readFile,
            createFile,
            readAnalytics,
        ]);

        adminRole.permissions.add(manageAll);

        userRole.permissions.add(
            readOwnOrder,
            readProduct,
            createOrder,
            createFile,
            readFile,
        );

        const adminDetails = em.create(UserDetails, {
            firstName: 'Richard',
            lastName: 'Price',
            phone: '+13213954644',
            dateOfBirth: new Date('1984-06-09'),
            avatar: null,
        });

        em.create(User, {
            email: 'admin@drone.com',
            password: 'admin123',
            role: adminRole,
            details: adminDetails,
            isEmailConfirmed: true,
        });

        const managerDetails1 = em.create(UserDetails, {
            firstName: 'Brandon',
            lastName: 'Waugh',
            phone: '+15053431902',
            dateOfBirth: new Date('1994-07-15'),
            avatar: null,
        });

        const managerDetails2 = em.create(UserDetails, {
            firstName: 'Daniel',
            lastName: 'Duncan',
            phone: '+17908597463',
            dateOfBirth: new Date('1993-12-18'),
            avatar: null,
        });

        em.create(User, {
            email: 'brandonmanager@mail.com',
            password: 'manager123',
            role: managerRole,
            details: managerDetails1,
            isEmailConfirmed: true,
        });

        em.create(User, {
            email: 'danielmanager@mail.com',
            password: 'manager123',
            role: managerRole,
            details: managerDetails2,
            isEmailConfirmed: true,
        });

        const customerDetails1 = em.create(UserDetails, {
            firstName: 'Tim',
            lastName: 'Wilcox',
            phone: '+14046160572',
            dateOfBirth: new Date('1988-10-06'),
            avatar: null,
        });

        const customerDetails2 = em.create(UserDetails, {
            firstName: 'Wanda',
            lastName: 'Harris',
            phone: '+17033846145',
            dateOfBirth: new Date('1982-06-18'),
            avatar: null,
        });

        const customerDetails3 = em.create(UserDetails, {
            firstName: 'Dominic',
            lastName: 'Puleo',
            phone: '+17027319670',
            dateOfBirth: new Date('1975-04-23'),
            avatar: null,
        });

        const customerDetails4 = em.create(UserDetails, {
            firstName: 'Carla',
            lastName: 'Brashear',
            phone: '+12035925599',
            dateOfBirth: new Date('1993-09-17'),
            avatar: null,
        });

        em.create(User, {
            email: 'timwilcox@mail.com',
            password: 'user123',
            role: userRole,
            details: customerDetails1,
            isEmailConfirmed: true,
        });

        em.create(User, {
            email: 'wandajharris@mail.com',
            password: 'user123',
            role: userRole,
            details: customerDetails2,
            isEmailConfirmed: true,
        });

        em.create(User, {
            email: 'dominicpuleo@mail.com',
            password: 'user123',
            role: userRole,
            details: customerDetails3,
            isEmailConfirmed: true,
        });

        em.create(User, {
            email: 'carlabrashear@mail.com',
            password: 'user123',
            role: userRole,
            details: customerDetails4,
            isEmailConfirmed: true,
        });

        const quadAgroImage = em.create(PublicFile, {
            key: 'f57514b3-c1dd-4ed6-a9be-c9cca8ae98d0',
            url: 'https://drone-ordering-images.s3.eu-central-1.amazonaws.com/f57514b3-c1dd-4ed6-a9be-c9cca8ae98d0',
        });
        const quadDeliveryImage = em.create(PublicFile, {
            key: '255ee219-c568-4f07-89a1-2f6c72491139',
            url: 'https://drone-ordering-images.s3.eu-central-1.amazonaws.com/255ee219-c568-4f07-89a1-2f6c72491139',
        });
        const quadMilitaryImage = em.create(PublicFile, {
            key: 'd994a30c-ed1a-4f61-971c-78df3781b31f',
            url: 'https://drone-ordering-images.s3.eu-central-1.amazonaws.com/d994a30c-ed1a-4f61-971c-78df3781b31f',
        });
        const quadCameraImage = em.create(PublicFile, {
            key: 'b4627ac9-084d-4a5a-a3d3-ef1d06f77830',
            url: 'https://drone-ordering-images.s3.eu-central-1.amazonaws.com/b4627ac9-084d-4a5a-a3d3-ef1d06f77830',
        });

        const quadAgroPrices = em.create(ProductPrice, {
            basePrice: 1999,
            lengthUnitPrice: 6,
            widthUnitPrice: 6,
            payloadCapacityUnitPrice: 12,
            flightDistanceUnitPrice: 8,
            flightTimeUnitPrice: 12,
            additionalEquipmentPrices: JSON.stringify({
                camera: 300,
                thermographicCamera: 450,
                nightVision: 600,
                parachute: 120,
                autopilot: 700,
                targetIdentification: 650,
                gps: 100,
            }),
            colorPrice: 50,
            coatingTexturePrice: 120,
        });

        const quadDeliveryPrices = em.create(ProductPrice, {
            basePrice: 1599,
            lengthUnitPrice: 10,
            widthUnitPrice: 10,
            payloadCapacityUnitPrice: 5,
            flightDistanceUnitPrice: 10,
            flightTimeUnitPrice: 8,
            additionalEquipmentPrices: JSON.stringify({
                camera: 150,
                thermographicCamera: 200,
                nightVision: 250,
                parachute: 80,
                autopilot: 800,
                targetIdentification: 500,
                gps: 150,
            }),
            colorPrice: 50,
            coatingTexturePrice: 100,
        });

        const quadMilitaryPrices = em.create(ProductPrice, {
            basePrice: 2499,
            lengthUnitPrice: 5,
            widthUnitPrice: 5,
            payloadCapacityUnitPrice: 8,
            flightDistanceUnitPrice: 8,
            flightTimeUnitPrice: 5,
            additionalEquipmentPrices: JSON.stringify({
                camera: 100,
                thermographicCamera: 300,
                nightVision: 500,
                parachute: 120,
                autopilot: 1000,
                targetIdentification: 600,
                gps: 120,
            }),
            colorPrice: 40,
            coatingTexturePrice: 80,
        });

        const quadCameraPrices = em.create(ProductPrice, {
            basePrice: 599,
            lengthUnitPrice: 3,
            widthUnitPrice: 3,
            payloadCapacityUnitPrice: 3,
            flightDistanceUnitPrice: 5,
            flightTimeUnitPrice: 5,
            additionalEquipmentPrices: JSON.stringify({
                camera: 0,
                thermographicCamera: 100,
                nightVision: 120,
                parachute: 50,
                autopilot: 160,
                targetIdentification: 240,
                gps: 100,
            }),
            colorPrice: 40,
            coatingTexturePrice: 50,
        });

        em.create(Product, {
            purpose: 'Agriculture',
            wingsType: 'Quadcopter',
            price: quadAgroPrices,
            image: quadAgroImage,
        });
        em.create(Product, {
            purpose: 'Delivery',
            wingsType: 'Quadcopter',
            price: quadDeliveryPrices,
            image: quadDeliveryImage,
        });
        em.create(Product, {
            purpose: 'Military',
            wingsType: 'Quadcopter',
            price: quadMilitaryPrices,
            image: quadMilitaryImage,
        });
        em.create(Product, {
            purpose: 'Photography',
            wingsType: 'Quadcopter',
            price: quadCameraPrices,
            image: quadCameraImage,
        });
    }
}
