import { type CreateProductPayload } from '../types/create-product-payload.type.js';

const DEFAULT_CREATE_PRODUCT_PAYLOAD: CreateProductPayload = {
    purpose: '',
    wingsType: '',
    price: {
        basePrice: '',
        lengthUnitPrice: '',
        widthUnitPrice: '',
        payloadCapacityUnitPrice: '',
        flightDistanceUnitPrice: '',
        flightTimeUnitPrice: '',
        additionalEquipmentPrices: {
            camera: '',
            thermographicCamera: '',
            nightVision: '',
            parachute: '',
            autopilot: '',
            targetIdentification: '',
            gps: '',
        },
        colorPrice: '',
        coatingTexturePrice: '',
    },
    image: null,
};

export { DEFAULT_CREATE_PRODUCT_PAYLOAD };
