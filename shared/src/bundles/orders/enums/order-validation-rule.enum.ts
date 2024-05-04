const OrderValidationRule = {
    length: {
        MIN: 1,
        MAX: 1000,
    },
    width: {
        MIN: 1,
        MAX: 1000,
    },
    payloadCapacity: {
        MIN: 1,
        MAX: 100,
    },
    flightDistance: {
        MIN: 1,
        MAX: 500,
    },
    flightTime: {
        MIN: 1,
        MAX: 180,
    },
    amount: {
        MIN: 1,
        MAX: 100,
    },
};

export { OrderValidationRule };
