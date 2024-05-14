import { type FileResponseDto } from '../../files/files.js';
import { type ProductPriceDto } from './product-price-dto.type.js';

type ProductRequestDto = {
    purpose: string;
    wingsType: string;
    price: ProductPriceDto;
    image: FileResponseDto | null;
};

export { type ProductRequestDto };
