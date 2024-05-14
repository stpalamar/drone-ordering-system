import { type FileResponseDto } from '~/bundles/files/types/types.js';

type OrderItemPayload = {
    purpose: string;
    wingsType: string;
    length: number | '';
    width: number | '';
    payloadCapacity: number | '';
    flightDistance: number | '';
    flightTime: number | '';
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
    amount: number | '';
    color: string;
    coatingTexture: FileResponseDto | null;
    additionalInfo?: string;
};

export { type OrderItemPayload };
