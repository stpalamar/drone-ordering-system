import { BaseEntity } from '@common/database/base.entity';
import { Entity, ManyToOne, OneToOne, Property } from '@mikro-orm/postgresql';
import { PublicFile } from '@modules/files/entities/public-file.entity';
import { Product } from '@modules/products/entities/product.entity';

import { OrderItemDto } from '../types/types';
import { Order } from './order.entity';

@Entity()
class OrderItem extends BaseEntity {
    @ManyToOne(() => Order)
    order: Order;

    @ManyToOne(() => Product)
    product: Product;

    @Property()
    length!: number;

    @Property()
    width!: number;

    @Property()
    payloadCapacity: number;

    @Property()
    flightDistance: number;

    @Property()
    flightTime: number;

    @Property()
    powerSource: string;

    @Property()
    materialType: string;

    @Property({ type: 'jsonb' })
    additionalEquipment: OrderItemDto['additionalEquipment'];

    @Property()
    amount!: number;

    @Property()
    color!: string;

    @OneToOne({ nullable: true })
    coatingTexture!: PublicFile | null;

    @Property({ nullable: true })
    additionalInfo!: string | null;

    @Property({ type: 'int' })
    price!: number;

    toObject() {
        return {
            purpose: this.product.purpose,
            wingsType: this.product.wingsType,
            imageUrl: this.product.image.url,
            length: this.length,
            width: this.width,
            payloadCapacity: this.payloadCapacity,
            flightDistance: this.flightDistance,
            flightTime: this.flightTime,
            powerSource: this.powerSource,
            materialType: this.materialType,
            additionalEquipment: this.additionalEquipment,
            amount: this.amount,
            color: this.color,
            coatingTexture: this.coatingTexture,
            additionalInfo: this.additionalInfo,
            price: this.price,
        };
    }
}

export { OrderItem };
