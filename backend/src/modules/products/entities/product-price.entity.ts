import { BaseEntity } from '@common/database/base.entity';
import { Entity, Property } from '@mikro-orm/postgresql';
import { ProductPriceDto } from 'shared/src/bundles/products/types/product-price-dto.type';

@Entity()
class ProductPrice extends BaseEntity {
    @Property()
    basePrice!: number;

    @Property()
    lengthUnitPrice!: number;

    @Property()
    widthUnitPrice!: number;

    @Property()
    payloadCapacityUnitPrice!: number;

    @Property()
    flightDistanceUnitPrice!: number;

    @Property()
    flightTimeUnitPrice!: number;

    @Property({ type: 'jsonb' })
    additionalEquipmentPrices!: ProductPriceDto['additionalEquipmentPrices'];

    @Property()
    colorPrice!: number;

    @Property()
    coatingTexturePrice!: number;

    toObject() {
        return {
            basePrice: this.basePrice,
            lengthUnitPrice: this.lengthUnitPrice,
            widthUnitPrice: this.widthUnitPrice,
            payloadCapacityUnitPrice: this.payloadCapacityUnitPrice,
            flightDistanceUnitPrice: this.flightDistanceUnitPrice,
            flightTimeUnitPrice: this.flightTimeUnitPrice,
            additionalEquipmentPrices: this.additionalEquipmentPrices,
            colorPrice: this.colorPrice,
            coatingTexturePrice: this.coatingTexturePrice,
        };
    }
}

export { ProductPrice };
