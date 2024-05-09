const ProductValidationRule = {
    PURPOSE: {
        MIN: 3,
        MAX: 20,
    },
    WINGS_TYPE: {
        MIN: 3,
        MAX: 20,
    },
} as const;

export { ProductValidationRule };
