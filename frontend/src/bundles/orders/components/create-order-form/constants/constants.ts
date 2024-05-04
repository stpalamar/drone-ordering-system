import {
    type CreateOrderPayload,
    type OrderItemPayload,
} from '../types/types.js';

const DEFAULT_ORDER_ITEM_PAYLOAD: OrderItemPayload = {
    purpose: '',
    wingsType: '',
    length: '',
    width: '',
    payloadCapacity: '',
    tankVolume: '',
    flightDistance: '',
    flightTime: '',
    powerSource: 'battery',
    materialType: 'plastic',
    additionalEquipment: {
        camera: false,
        thermographicCamera: false,
        nightVision: false,
        parachute: false,
        autopilot: false,
        targetIdentification: false,
        gps: false,
    },
    amount: '',
    color: '',
    coatingTexture: null,
    additionalInfo: '',
};

const DEFAULT_CREATE_ORDER_PAYLOAD: CreateOrderPayload = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    items: [DEFAULT_ORDER_ITEM_PAYLOAD],
};

export { DEFAULT_CREATE_ORDER_PAYLOAD, DEFAULT_ORDER_ITEM_PAYLOAD };
