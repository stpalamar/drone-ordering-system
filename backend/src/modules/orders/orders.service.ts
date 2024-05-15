import { randomUUID } from 'node:crypto';

import { PagedResponse } from '@common/types/types';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';
import { Product } from '@modules/products/entities/product.entity';
import { User } from '@modules/users/entities/user.entity';
import { UserRole } from '@modules/users/enums/enums';
import { UsersService } from '@modules/users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Order } from './entities/order.entity';
import { OrderStatus } from './enums/enums';
import { getPeriodDate } from './helpers/helpers';
import {
    OrderItemDto,
    OrderQueryDto,
    OrderRequestDto,
    OrderResponseDto,
    OrderStatusDto,
} from './types/types';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: EntityRepository<Order>,
        @InjectRepository(Product)
        private readonly productRepository: EntityRepository<Product>,
        private readonly usersService: UsersService,
        private readonly em: EntityManager,
    ) {}

    async create(
        createOrderDto: OrderRequestDto,
        user: User,
    ): Promise<OrderResponseDto> {
        const uuid = randomUUID();

        const orderItems = await this.getOrderItems(createOrderDto.items);

        const manager =
            user.role.name === UserRole.MANAGER ||
            user.role.name === UserRole.ADMIN
                ? user
                : null;
        const customer = user.role.name === UserRole.USER ? user : null;
        const status =
            user.role.name === UserRole.USER
                ? OrderStatus.PENDING
                : OrderStatus.CONFIRMED;
        const totalPrice = orderItems.reduce(
            (total, item) => total + item.price,
            0,
        );

        const newOrder = this.orderRepository.create({
            ...createOrderDto,
            items: orderItems,
            orderNumber: uuid,
            manager,
            customer,
            status,
            totalPrice,
        });
        this.em.persistAndFlush(newOrder);
        return newOrder.toObject();
    }

    async findAll(
        query: OrderQueryDto,
        user: User,
    ): Promise<PagedResponse<OrderResponseDto>> {
        const { page, limit, status, period, assigned } = query;

        const periodDate = getPeriodDate(period);

        const allForCustomer = {
            customer: user.id,
        };

        const allForManager = {
            manager: user.id,
        };

        const role = user.role.name;

        const [orders, count] = await this.orderRepository.findAndCount(
            {
                status: status ? { $in: status } : {},
                createdAt: periodDate ? { $gte: periodDate } : {},
                ...(role === UserRole.MANAGER && assigned ? allForManager : {}),
                ...(role === UserRole.MANAGER && !assigned
                    ? { manager: null }
                    : {}),
                ...(role === UserRole.USER ? allForCustomer : {}),
            },
            {
                populate: [
                    'items',
                    'items.product',
                    'customer',
                    'manager',
                    'customer.role',
                    'manager.role',
                    'customer.details',
                    'manager.details',
                    'customer.role.permissions',
                    'manager.role.permissions',
                ],
                offset: (page - 1) * limit,
                limit: limit,
                orderBy: { id: 'ASC' },
            },
        );

        return {
            items: orders.map((order) => order.toObject()),
            page: page ?? 1,
            perPage: limit ?? count,
            total: count,
            totalPages: Math.ceil(count / (limit ?? count)),
        };
    }

    async findOne(id: number): Promise<OrderResponseDto> {
        const order = await this.orderRepository.findOne(
            { id },
            {
                populate: [
                    'items',
                    'items.product',
                    'customer',
                    'manager',
                    'customer.role',
                    'manager.role',
                    'customer.details',
                    'manager.details',
                    'customer.role.permissions',
                    'manager.role.permissions',
                ],
            },
        );

        if (!order) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
        }

        return order.toObject();
    }

    async update(id: number, updateOrderDto: OrderRequestDto) {
        const order = await this.orderRepository.findOne(
            { id },
            {
                populate: [
                    'items',
                    'items.coatingTexture',
                    'manager',
                    'customer',
                ],
            },
        );

        if (!order) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
        }

        const orderItems = await this.getOrderItems(updateOrderDto.items);

        wrap(order).assign({
            email: updateOrderDto.email,
            firstName: updateOrderDto.firstName,
            lastName: updateOrderDto.lastName,
            phone: updateOrderDto.phone,
            items: orderItems,
        });
        this.em.persistAndFlush(order);
        return order.toObject();
    }

    async updateStatus(id: number, updateOrderStatusDto: OrderStatusDto) {
        const order = await this.orderRepository.findOne(
            { id },
            {
                populate: [
                    'items',
                    'items.product',
                    'customer',
                    'manager',
                    'customer.role',
                    'manager.role',
                    'customer.details',
                    'manager.details',
                    'customer.role.permissions',
                    'manager.role.permissions',
                ],
            },
        );

        if (!order) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
        }

        wrap(order).assign({ status: updateOrderStatusDto.status });
        this.em.persistAndFlush(order);
        return order.toObject();
    }

    async assignOrder(id: number, user: User) {
        const order = await this.orderRepository.findOne(
            { id },
            {
                populate: [
                    'items',
                    'items.product',
                    'customer',
                    'manager',
                    'customer.role',
                    'manager.role',
                    'customer.details',
                    'manager.details',
                    'customer.role.permissions',
                    'manager.role.permissions',
                ],
            },
        );

        if (!order) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
        }

        wrap(order).assign({ manager: user });
        this.em.persistAndFlush(order);
        return order.toObject();
    }

    async softDelete(id: number) {
        const order = await this.orderRepository.findOne({ id });

        if (!order) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
        }

        order.deletedAt = new Date();
        this.em.persistAndFlush(order);
    }

    private async getOrderItems(items: OrderItemDto[]) {
        return await Promise.all(
            items.map(async (item) => {
                const product = await this.productRepository.findOne(
                    {
                        wingsType: item.wingsType,
                        purpose: item.purpose,
                    },
                    {
                        populate: ['price'],
                    },
                );

                if (!product) {
                    throw new HttpException(
                        'Product not found',
                        HttpStatus.NOT_FOUND,
                    );
                }

                product.totalSales += 1;
                this.em.persistAndFlush(product);

                return {
                    ...item,
                    additionalEquipment: item.additionalEquipment,
                    coatingTexture: item.coatingTexture
                        ? item.coatingTexture.id
                        : null,
                    product,
                    price: this.calculateOrderItemPrice(item, product),
                };
            }),
        );
    }

    private calculateOrderItemPrice(item: OrderItemDto, product: Product) {
        let itemPrice = 0;

        itemPrice += product.price.basePrice;

        itemPrice += item.length * product.price.lengthUnitPrice;
        itemPrice += item.width * product.price.widthUnitPrice;
        itemPrice +=
            item.payloadCapacity * product.price.payloadCapacityUnitPrice;
        itemPrice +=
            item.flightDistance * product.price.flightDistanceUnitPrice;
        itemPrice += item.flightTime * product.price.flightTimeUnitPrice;

        const additionalEquipmentPrices =
            product.price.additionalEquipmentPrices;
        const additionalEquipment = item.additionalEquipment;

        for (const equipment in additionalEquipment) {
            if (additionalEquipment[equipment]) {
                itemPrice += additionalEquipmentPrices[equipment];
            }
        }

        itemPrice += product.price.colorPrice;

        if (item.coatingTexture) {
            itemPrice += product.price.coatingTexturePrice;
        }

        itemPrice += itemPrice * item.amount;
        return itemPrice;
    }
}
