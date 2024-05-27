// eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
// @ts-ignore
import { isValidPhoneNumber } from 'react-phone-number-input';
import { z } from 'zod';

import { OrderValidationMessage, OrderValidationRule } from '../enums/enums.js';

const orderItemValidationSchema = z.object({
    purpose: z.string().min(1, OrderValidationMessage.purpose.FIELD_REQUIRED),
    wingsType: z
        .string()
        .min(1, OrderValidationMessage.wingsType.FIELD_REQUIRED),
    length: z.coerce
        .number({
            invalid_type_error:
                OrderValidationMessage.length.FIELD_NUMBER_INVALID,
        })
        .min(
            OrderValidationRule.length.MIN,
            OrderValidationMessage.length.FIELD_VALUE_INVALID,
        )
        .max(
            OrderValidationRule.length.MAX,
            OrderValidationMessage.length.FIELD_VALUE_INVALID,
        ),
    width: z.coerce
        .number({
            invalid_type_error:
                OrderValidationMessage.width.FIELD_NUMBER_INVALID,
        })
        .min(
            OrderValidationRule.width.MIN,
            OrderValidationMessage.width.FIELD_VALUE_INVALID,
        )
        .max(
            OrderValidationRule.width.MAX,
            OrderValidationMessage.width.FIELD_VALUE_INVALID,
        ),
    payloadCapacity: z.coerce
        .number({
            invalid_type_error:
                OrderValidationMessage.payloadCapacity.FIELD_NUMBER_INVALID,
        })
        .min(
            OrderValidationRule.payloadCapacity.MIN,
            OrderValidationMessage.payloadCapacity.FIELD_VALUE_INVALID,
        )
        .max(
            OrderValidationRule.payloadCapacity.MAX,
            OrderValidationMessage.payloadCapacity.FIELD_VALUE_INVALID,
        ),
    flightDistance: z.coerce
        .number({
            invalid_type_error:
                OrderValidationMessage.flightDistance.FIELD_NUMBER_INVALID,
        })
        .min(
            OrderValidationRule.flightDistance.MIN,
            OrderValidationMessage.payloadCapacity.FIELD_VALUE_INVALID,
        )
        .max(
            OrderValidationRule.flightDistance.MAX,
            OrderValidationMessage.payloadCapacity.FIELD_VALUE_INVALID,
        ),
    flightTime: z.coerce
        .number({
            invalid_type_error:
                OrderValidationMessage.flightTime.FIELD_NUMBER_INVALID,
        })
        .min(
            OrderValidationRule.flightTime.MIN,
            OrderValidationMessage.flightTime.FIELD_VALUE_INVALID,
        )
        .max(
            OrderValidationRule.flightTime.MAX,
            OrderValidationMessage.flightTime.FIELD_VALUE_INVALID,
        ),
    powerSource: z.string(),
    materialType: z.string(),
    additionalEquipment: z.object({
        camera: z.boolean(),
        thermographicCamera: z.boolean(),
        nightVision: z.boolean(),
        parachute: z.boolean(),
        autopilot: z.boolean(),
        targetIdentification: z.boolean(),
        gps: z.boolean(),
    }),
    amount: z.coerce
        .number({
            invalid_type_error: OrderValidationMessage.amount.FIELD_INVALID,
        })
        .min(
            OrderValidationRule.amount.MIN,
            OrderValidationMessage.amount.FIELD_INVALID,
        )
        .max(
            OrderValidationRule.amount.MAX,
            OrderValidationMessage.amount.FIELD_INVALID,
        ),
    color: z.string().min(1, OrderValidationMessage.color.FIELD_REQUIRED),
    coatingTexture: z
        .object(
            {
                id: z.number(),
                url: z.string(),
                key: z.string(),
            },
            { message: OrderValidationMessage.coatingTexture.FIELD_REQUIRED },
        )
        .nullable(),
    additionalInfo: z
        .literal('')
        .transform(() => null)
        .nullable()
        .or(
            z
                .string()
                .trim()
                .min(1)
                .max(
                    OrderValidationRule.additionalInfo.MAX,
                    OrderValidationMessage.additionalInfo.FIELD_MAX,
                ),
        ),
});

const orderValidationSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(1, OrderValidationMessage.firstName.FIELD_REQUIRED),
    lastName: z
        .string()
        .trim()
        .min(1, OrderValidationMessage.lastName.FIELD_REQUIRED),
    phone: z.string().refine(isValidPhoneNumber, {
        message: OrderValidationMessage.phone.INVALID_PHONE,
    }),
    email: z
        .string()
        .trim()
        .email(OrderValidationMessage.email.INVALID_EMAIL)
        .min(1, OrderValidationMessage.email.FIELD_REQUIRED),
    items: z.array(orderItemValidationSchema),
});

export { orderValidationSchema };
