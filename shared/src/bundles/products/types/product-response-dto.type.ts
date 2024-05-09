import { type FileResponseDto } from '../../files/files.js';

type ProductResponseDto = {
    id: number;
    purpose: string;
    wingsType: string;
    basePrice: number;
    image: FileResponseDto;
    createdAt: string;
};

export { type ProductResponseDto };
