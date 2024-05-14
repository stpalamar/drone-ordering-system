import { type FileResponseDto } from '../../files/files.js';
import { type ProductPriceDto } from './product-price-dto.type.js';

type ProductResponseDto = {
    id: number;
    purpose: string;
    wingsType: string;
    price: ProductPriceDto;
    totalSales: number;
    image: FileResponseDto;
    createdAt: string;
};

export { type ProductResponseDto };
