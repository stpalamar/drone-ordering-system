import { randomUUID } from 'node:crypto';

import { PagedResponse } from '@common/types/types';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';
import { Product } from '@modules/products/entities/product.entity';
import { User } from '@modules/users/entities/user.entity';
import { UserRole } from '@modules/users/enums/enums';
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
        private readonly em: EntityManager,
    ) {}

    async create(
        createOrderDto: OrderRequestDto,
        user: User,
    ): Promise<OrderResponseDto> {
        const uuid = randomUUID();

        const orderItems = await this.getOrderItems(createOrderDto.items);

        const newOrder = this.orderRepository.create({
            ...createOrderDto,
            items: orderItems,
            orderNumber: uuid,
            status:
                user.role.name === UserRole.USER
                    ? OrderStatus.PENDING
                    : OrderStatus.CONFIRMED,
        });
        this.em.persistAndFlush(newOrder);
        return newOrder.toObject();
    }

    async findAll(
        query: OrderQueryDto,
    ): Promise<PagedResponse<OrderResponseDto>> {
        const { page, limit, status, period } = query;

        const periodDate = getPeriodDate(period);

        const [orders, count] = await this.orderRepository.findAndCount(
            {
                status: status ? { $in: status } : {},
                createdAt: periodDate ? { $gte: periodDate } : {},
            },
            {
                populate: ['items', 'items.product'],
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
            { populate: ['items', 'items.product', 'items.coatingTexture'] },
        );

        if (!order) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
        }

        return order.toObject();
    }

    async update(id: number, updateOrderDto: OrderRequestDto) {
        const order = await this.orderRepository.findOne(
            { id },
            { populate: ['items', 'items.coatingTexture'] },
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
            { populate: ['items'] },
        );

        if (!order) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
        }

        wrap(order).assign({ status: updateOrderStatusDto.status });
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
                const product = await this.productRepository.findOne({
                    wingsType: item.wingsType,
                    purpose: item.purpose,
                });

                if (!product) {
                    throw new HttpException(
                        'Product not found',
                        HttpStatus.NOT_FOUND,
                    );
                }

                return {
                    ...item,
                    additionalEquipment: JSON.stringify(
                        item.additionalEquipment,
                    ),
                    coatingTexture: item.coatingTexture
                        ? item.coatingTexture.id
                        : null,
                    product,
                };
            }),
        );
    }
}
