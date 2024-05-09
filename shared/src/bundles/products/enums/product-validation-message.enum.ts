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
    IMAGE: {
        REQUIRED: 'Image is required',
    },
} as const;

export { ProductValidationMessage };
