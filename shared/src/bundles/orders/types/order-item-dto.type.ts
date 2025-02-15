import { type FileResponseDto } from '../../files/files.js';

type OrderItemDto = {
    purpose: string;
    wingsType: string;
    imageUrl: string;
    length: number;
    width: number;
    payloadCapacity: number;
    flightDistance: number;
    flightTime: number;
    powerSource: string;
    materialType: string;
    additionalEquipment: {
        camera: boolean;
        thermographicCamera: boolean;
        nightVision: boolean;
        parachute: boolean;
        autopilot: boolean;
        targetIdentification: boolean;
        gps: boolean;
    };
    amount: number;
    color: string;
    coatingTexture: FileResponseDto | null;
    additionalInfo: string | null;
    price: number;
};

export { type OrderItemDto };
