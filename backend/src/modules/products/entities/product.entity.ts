import { BaseEntity } from '@common/database/base.entity';
import { WithSoftDelete } from '@common/database/filters/filters';
import { Entity, Index, OneToOne, Property } from '@mikro-orm/postgresql';
import { PublicFile } from '@modules/files/entities/public-file.entity';

import { ProductPrice } from './product-price.entity';

@Entity()
@Index({
    name: 'product_purpose_wings_type_deleted_at_null_unique',
    expression:
        'create unique index product_purpose_wings_type_deleted_at_null_unique on product (purpose, wings_type) where deleted_at is null',
})
@WithSoftDelete()
class Product extends BaseEntity {
    @Property()
    purpose!: string;

    @Property()
    wingsType!: string;

    @OneToOne()
    image!: PublicFile;

    @OneToOne({ entity: () => ProductPrice, orphanRemoval: true })
    price!: ProductPrice;

    @Property({ type: 'int', default: 0 })
    totalSales!: number;

    @Index()
    @Property({ nullable: true, type: 'timestamptz' })
    deletedAt?: Date;

    toObject() {
        return {
            id: this.id,
            purpose: this.purpose,
            wingsType: this.wingsType,
            image: this.image,
            totalSales: this.totalSales,
            price: this.price.toObject(),
            createdAt: this.createdAt.toISOString(),
        };
    }
}

export { Product };
