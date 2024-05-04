import { OrderValidationRule } from './order-validation-rule.enum.js';

const OrderValidationMessage = {
    firstName: {
        FIELD_REQUIRED: 'First name is required',
    },
    lastName: {
        FIELD_REQUIRED: 'Last name is required',
    },
    phone: {
        FIELD_REQUIRED: 'Phone is required',
    },
    email: {
        FIELD_REQUIRED: 'Email is required',
        INVALID_EMAIL: 'Invalid email',
    },
    purpose: {
        FIELD_REQUIRED: 'Purpose is required',
    },
    wingsType: {
        FIELD_REQUIRED: 'Wings type is required',
    },
    length: {
        FIELD_REQUIRED: 'Length is required',
        FIELD_NUMBER_INVALID: 'Length must be a number',
        FIELD_VALUE_INVALID: `Length must be from ${OrderValidationRule.length.MIN} to ${OrderValidationRule.length.MAX} `,
    },
    width: {
        FIELD_REQUIRED: 'Width is required',
        FIELD_NUMBER_INVALID: 'Width must be a number',
        FIELD_VALUE_INVALID: `Width must be from ${OrderValidationRule.width.MIN} to ${OrderValidationRule.width.MAX} `,
    },
    payloadCapacity: {
        FIELD_REQUIRED: 'Payload capacity is required',
        FIELD_NUMBER_INVALID: 'Payload capacity must be a number',
        FIELD_VALUE_INVALID: `Payload capacity must be from ${OrderValidationRule.payloadCapacity.MIN} to ${OrderValidationRule.payloadCapacity.MAX} `,
    },
    flightDistance: {
        FIELD_REQUIRED: 'Flight distance is required',
        FIELD_NUMBER_INVALID: 'Flight distance must be a number',
        FIELD_VALUE_INVALID: `Flight distance must be from ${OrderValidationRule.flightDistance.MIN} to ${OrderValidationRule.flightDistance.MAX} `,
    },
    flightTime: {
        FIELD_REQUIRED: 'Flight time is required',
        FIELD_NUMBER_INVALID: 'Flight time must be a number',
        FIELD_VALUE_INVALID: `Flight time must be from ${OrderValidationRule.flightTime.MIN} to ${OrderValidationRule.flightTime.MAX} `,
    },
    powerSource: {
        FIELD_REQUIRED: 'Power source is required',
    },
    materialType: {
        FIELD_REQUIRED: 'Material type is required',
    },
    amount: {
        FIELD_REQUIRED: 'Amount is required',
        FIELD_INVALID: `Amount must be from ${OrderValidationRule.amount.MIN} to ${OrderValidationRule.amount.MAX} `,
    },
    color: {
        FIELD_REQUIRED: 'Color is required',
    },
    coatingTexture: {
        FIELD_REQUIRED: 'Coating texture is required',
    },
    additionalInfo: {
        INVALID: 'Invalid additional info',
    },
};

export { OrderValidationMessage };
