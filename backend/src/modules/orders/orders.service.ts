import { randomUUID } from 'node:crypto';

import { PagedResponse } from '@common/types/types';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';
import { Chat } from '@modules/chats/entities/chat.entity';
import { PdfService } from '@modules/pdf/pdf.service';
import { Product } from '@modules/products/entities/product.entity';
import { User } from '@modules/users/entities/user.entity';
import { UserRole } from '@modules/users/enums/enums';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Order } from './entities/order.entity';
import { AssignedType, OrderStatus } from './enums/enums';
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
        @InjectRepository(Chat)
        private readonly chatsRepository: EntityRepository<Chat>,
        private readonly em: EntityManager,
        private readonly pdfService: PdfService,
    ) {}

    async create(
        createOrderDto: OrderRequestDto,
        user: User,
    ): Promise<OrderResponseDto> {
        const uuid = randomUUID();

        const orderItems = await this.getOrderItems(createOrderDto.items, true);

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

        const chat = this.chatsRepository.create({
            users: [user],
        });
        this.em.persistAndFlush(chat);

        const newOrder = this.orderRepository.create({
            ...createOrderDto,
            items: orderItems,
            orderNumber: uuid,
            manager,
            customer,
            status,
            totalPrice,
            chat,
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
                status: status ? status : {},
                createdAt: periodDate ? { $gte: periodDate } : {},
                ...(role === UserRole.MANAGER && assigned === AssignedType.ME
                    ? allForManager
                    : {}),
                ...(role === UserRole.MANAGER &&
                assigned === AssignedType.UNASSIGNED
                    ? { manager: null }
                    : {}),
                ...(role === UserRole.USER ? allForCustomer : {}),
            },
            {
                populate: [
                    'items',
                    'items.product',
                    'items.product.image',
                    'items.coatingTexture',
                    'customer',
                    'manager',
                    'customer.role',
                    'manager.role',
                    'customer.details',
                    'manager.details',
                    'customer.role.permissions',
                    'manager.role.permissions',
                ],
                filters: {
                    softDelete: {
                        getAll: true,
                    },
                },
                offset: (page - 1) * limit,
                limit: limit,
                orderBy: { createdAt: 'DESC' },
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
                    'items.product.image',
                    'items.coatingTexture',
                    'customer',
                    'manager',
                    'customer.role',
                    'manager.role',
                    'customer.details',
                    'manager.details',
                    'customer.role.permissions',
                    'manager.role.permissions',
                    'customer.details.avatar',
                    'manager.details.avatar',
                ],
                filters: {
                    softDelete: {
                        getAll: true,
                    },
                },
            },
        );

        if (!order) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
        }

        return order.toObject();
    }

    async generatePdf(id: number) {
        const order = await this.orderRepository.findOne(
            { id },
            {
                populate: [
                    'items',
                    'items.product',
                    'items.product.image',
                    'items.coatingTexture',
                    'customer',
                    'manager',
                    'customer.role',
                    'manager.role',
                    'customer.details',
                    'manager.details',
                    'customer.role.permissions',
                    'manager.role.permissions',
                ],
                filters: {
                    softDelete: {
                        getAll: true,
                    },
                },
            },
        );

        if (!order) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
        }

        return await this.pdfService.generateOrderPdf(order);
    }

    async update(id: number, updateOrderDto: OrderRequestDto) {
        const order = await this.orderRepository.findOne(
            { id },
            {
                populate: [
                    'items',
                    'items.product',
                    'items.product.image',
                    'items.coatingTexture',
                    'customer',
                    'manager',
                    'customer.role',
                    'manager.role',
                    'customer.details',
                    'manager.details',
                    'customer.role.permissions',
                    'manager.role.permissions',
                ],
                filters: {
                    softDelete: {
                        getAll: true,
                    },
                },
            },
        );

        if (!order) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
        }

        const orderItems = await this.getOrderItems(
            updateOrderDto.items,
            false,
        );

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
                    'items.product.image',
                    'items.coatingTexture',
                    'customer',
                    'manager',
                    'customer.role',
                    'manager.role',
                    'customer.details',
                    'manager.details',
                    'customer.role.permissions',
                    'manager.role.permissions',
                ],
                filters: {
                    softDelete: {
                        getAll: true,
                    },
                },
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
                    'items.product.image',
                    'items.coatingTexture',
                    'customer',
                    'manager',
                    'customer.role',
                    'manager.role',
                    'customer.details',
                    'manager.details',
                    'customer.role.permissions',
                    'manager.role.permissions',
                    'chat',
                ],
                filters: {
                    softDelete: {
                        getAll: true,
                    },
                },
            },
        );

        if (!order) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
        }

        order.chat.users.add(user);

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

    private async getOrderItems(items: OrderItemDto[], isCreate: boolean) {
        return await Promise.all(
            items.map(async (item) => {
                const product = await this.productRepository.findOne(
                    {
                        wingsType: item.wingsType,
                        purpose: item.purpose,
                    },
                    {
                        populate: ['price'],
                        filters: {
                            softDelete: {
                                getAll: true,
                            },
                        },
                    },
                );

                if (!product) {
                    throw new HttpException(
                        'Product not found',
                        HttpStatus.NOT_FOUND,
                    );
                }

                if (isCreate) {
                    product.totalSales += 1;
                    await this.em.persistAndFlush(product);
                }

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
