type ProductPriceDto = {
    basePrice: number;
    lengthUnitPrice: number;
    widthUnitPrice: number;
    payloadCapacityUnitPrice: number;
    flightDistanceUnitPrice: number;
    flightTimeUnitPrice: number;
    additionalEquipmentPrices: {
        camera: number;
        thermographicCamera: number;
        nightVision: number;
        parachute: number;
        autopilot: number;
        targetIdentification: number;
        gps: number;
    };
    colorPrice: number;
    coatingTexturePrice: number;
};

export { type ProductPriceDto };
