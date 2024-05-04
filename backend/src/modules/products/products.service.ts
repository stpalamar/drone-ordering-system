import { PagedResponse } from '@common/types/types';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Product } from './entities/product.entity';
import { type ProductRequestDto, type ProductResponseDto } from './types/types';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: EntityRepository<Product>,
        private readonly em: EntityManager,
    ) {}

    async create(createProductDto: ProductRequestDto) {
        const product = await this.productRepository.findOne({
            purpose: createProductDto.purpose,
            wingsType: createProductDto.wingsType,
        });

        if (product) {
            throw new HttpException(
                'Product already exists',
                HttpStatus.CONFLICT,
            );
        }

        const newProduct = this.productRepository.create({
            purpose: createProductDto.purpose,
            wingsType: createProductDto.wingsType,
            basePrice: createProductDto.basePrice,
            image: createProductDto.image.id,
        });

        await this.em.persistAndFlush(newProduct);
        await wrap(newProduct).populate(['image']);

        return newProduct.toObject();
    }

    async findAll(
        page: number,
        limit: number,
    ): Promise<PagedResponse<ProductResponseDto>> {
        if (page < 1 || limit < 1) {
            throw new HttpException(
                'Invalid query parameters',
                HttpStatus.BAD_REQUEST,
            );
        }

        const [products, count] = await this.productRepository.findAndCount(
            {},
            {
                populate: ['image'],
                limit,
                offset: (page - 1) * limit,
                orderBy: { id: 'ASC' },
            },
        );

        return {
            items: products.map((product) => product.toObject()),
            page: page ?? 1,
            perPage: limit ?? count,
            total: count,
            totalPages: Math.ceil(count / (limit ?? count)),
        };
    }

    async findOne(id: number) {
        const product = await this.productRepository.findOne({
            id,
        });

        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }

        return product;
    }

    async update(id: number, updateProductDto: ProductRequestDto) {
        const product = await this.productRepository.findOne({
            id,
        });

        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }

        this.productRepository.assign(product, { ...updateProductDto });
        this.em.persistAndFlush(product);
        return product;
    }

    async softDelete(id: number) {
        const product = await this.productRepository.findOne({
            id,
        });

        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }

        product.deletedAt = new Date();
        this.em.persistAndFlush(product);
    }

    async getUniqueTypes() {
        const connection = this.productRepository
            .getEntityManager()
            .getConnection();

        const aggregatedPurposes = await connection.execute(
            'SELECT purpose, ARRAY_AGG(DISTINCT wings_type) AS wings_types FROM Product GROUP BY purpose',
        );
        const aggregatedWingsTypes = await connection.execute(
            'SELECT wings_type, ARRAY_AGG(DISTINCT purpose) AS purposes FROM Product GROUP BY wings_type',
        );

        const formattedPurposes = aggregatedPurposes.map((item) => ({
            purpose: item.purpose,
            wingsTypes: item.wings_types,
        }));
        const formattedWingsTypes = aggregatedWingsTypes.map((item) => ({
            wingsType: item.wings_type,
            purposes: item.purposes,
        }));

        return {
            purposes: formattedPurposes,
            wingsTypes: formattedWingsTypes,
        };
    }
}
