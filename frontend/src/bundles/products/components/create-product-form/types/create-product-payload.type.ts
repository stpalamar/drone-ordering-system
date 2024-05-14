import { type FileResponseDto } from '~/bundles/files/types/types.js';

type CreateProductPayload = {
    purpose: string;
    wingsType: string;
    price: {
        basePrice: number | '';
        lengthUnitPrice: number | '';
        widthUnitPrice: number | '';
        payloadCapacityUnitPrice: number | '';
        flightDistanceUnitPrice: number | '';
        flightTimeUnitPrice: number | '';
        additionalEquipmentPrices: {
            camera: number | '';
            thermographicCamera: number | '';
            nightVision: number | '';
            parachute: number | '';
            autopilot: number | '';
            targetIdentification: number | '';
            gps: number | '';
        };
        colorPrice: number | '';
        coatingTexturePrice: number | '';
    };
    image: FileResponseDto | null;
};

export { type CreateProductPayload };
