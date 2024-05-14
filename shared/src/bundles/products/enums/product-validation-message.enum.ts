import { ProductValidationRule } from './product-validation-rule.enum.js';

const ProductValidationMessage = {
    PURPOSE: {
        REQUIRED: 'Purpose is required',
        INVALID: `Purpose must have from ${ProductValidationRule.PURPOSE.MIN} to ${ProductValidationRule.PURPOSE.MAX} characters`,
    },
    WINGS_TYPE: {
        REQUIRED: 'Wings type is required',
        INVALID: `Wings type must have from ${ProductValidationRule.WINGS_TYPE.MIN} to ${ProductValidationRule.WINGS_TYPE.MAX} characters`,
    },
    BASE_PRICE: {
        REQUIRED: 'Base price is required',
        INVALID: 'Base price is invalid',
        POSITIVE: 'Base price must be positive',
    },
    LENGTH_PRICE: {
        REQUIRED: 'Length price is required',
        INVALID: 'Length price is invalid',
        POSITIVE: 'Length price must be positive',
    },
    WIDTH_PRICE: {
        REQUIRED: 'Width price is required',
        INVALID: 'Width price is invalid',
        POSITIVE: 'Width price must be positive',
    },
    PAYLOAD_CAPACITY_PRICE: {
        REQUIRED: 'Payload capacity price is required',
        INVALID: 'Payload capacity price is invalid',
        POSITIVE: 'Payload capacity price must be positive',
    },
    FLIGHT_DISTANCE_PRICE: {
        REQUIRED: 'Flight distance price is required',
        INVALID: 'Flight distance price is invalid',
        POSITIVE: 'Flight distance price must be positive',
    },
    FLIGHT_TIME_PRICE: {
        REQUIRED: 'Flight time price is required',
        INVALID: 'Flight time price is invalid',
        POSITIVE: 'Flight time price must be positive',
    },
    ADDITIONAL_EQUIPMENT_PRICES: {
        CAMERA: {
            INVALID: 'Camera price is invalid',
            POSITIVE: 'Camera price must be positive',
        },
        THERMOGRAPHIC_CAMERA: {
            INVALID: 'Thermographic camera price is invalid',
            POSITIVE: 'Thermographic camera price must be positive',
        },
        NIGHT_VISION: {
            INVALID: 'Night vision price is invalid',
            POSITIVE: 'Night vision price must be positive',
        },
        PARACHUTE: {
            INVALID: 'Parachute price is invalid',
            POSITIVE: 'Parachute price must be positive',
        },
        AUTOPILOT: {
            INVALID: 'Autopilot price is invalid',
            POSITIVE: 'Autopilot price must be positive',
        },
        TARGET_IDENTIFICATION: {
            INVALID: 'Target identification price is invalid',
            POSITIVE: 'Target identification price must be positive',
        },
        GPS: {
            INVALID: 'GPS price is invalid',
            POSITIVE: 'GPS price must be positive',
        },
    },
    COLOR_PRICE: {
        REQUIRED: 'Color price is required',
        INVALID: 'Color price is invalid',
        POSITIVE: 'Color price must be positive',
    },
    COATING_TEXTURE_PRICE: {
        REQUIRED: 'Coating texture price is required',
        INVALID: 'Coating texture price is invalid',
        POSITIVE: 'Coating texture price must be positive',
    },
    IMAGE: {
        REQUIRED: 'Image is required',
    },
} as const;

export { ProductValidationMessage };
