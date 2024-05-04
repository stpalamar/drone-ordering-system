import { type FileResponseDto } from '../../files/files.js';

type ProductRequestDto = {
    purpose: string;
    wingsType: string;
    basePrice: number;
    image: FileResponseDto | null;
};

export { type ProductRequestDto };
