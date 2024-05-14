import { z } from 'zod';

import {
    ProductValidationMessage,
    ProductValidationRule,
} from '../enums/enums.js';

const productPriceValidationSchema = z.object({
    basePrice: z.coerce
        .number({
            invalid_type_error: ProductValidationMessage.BASE_PRICE.INVALID,
        })
        .positive(ProductValidationMessage.BASE_PRICE.POSITIVE),
    lengthUnitPrice: z.coerce
        .number({
            invalid_type_error: ProductValidationMessage.LENGTH_PRICE.INVALID,
        })
        .positive(ProductValidationMessage.LENGTH_PRICE.POSITIVE),
    widthUnitPrice: z.coerce
        .number({
            invalid_type_error: ProductValidationMessage.WIDTH_PRICE.INVALID,
        })
        .positive(ProductValidationMessage.WIDTH_PRICE.POSITIVE),
    payloadCapacityUnitPrice: z.coerce
        .number({
            invalid_type_error:
                ProductValidationMessage.PAYLOAD_CAPACITY_PRICE.INVALID,
        })
        .positive(ProductValidationMessage.PAYLOAD_CAPACITY_PRICE.POSITIVE),
    flightDistanceUnitPrice: z.coerce
        .number({
            invalid_type_error:
                ProductValidationMessage.FLIGHT_DISTANCE_PRICE.INVALID,
        })
        .positive(ProductValidationMessage.FLIGHT_DISTANCE_PRICE.POSITIVE),
    flightTimeUnitPrice: z.coerce
        .number({
            invalid_type_error:
                ProductValidationMessage.FLIGHT_TIME_PRICE.INVALID,
        })
        .positive(ProductValidationMessage.FLIGHT_TIME_PRICE.POSITIVE),
    additionalEquipmentPrices: z.object({
        camera: z.coerce
            .number({
                invalid_type_error:
                    ProductValidationMessage.ADDITIONAL_EQUIPMENT_PRICES.CAMERA
                        .INVALID,
            })
            .positive(
                ProductValidationMessage.ADDITIONAL_EQUIPMENT_PRICES.CAMERA
                    .POSITIVE,
            ),
        thermographicCamera: z.coerce
            .number({
                invalid_type_error:
                    ProductValidationMessage.ADDITIONAL_EQUIPMENT_PRICES
                        .THERMOGRAPHIC_CAMERA.INVALID,
            })
            .positive(
                ProductValidationMessage.ADDITIONAL_EQUIPMENT_PRICES
                    .THERMOGRAPHIC_CAMERA.POSITIVE,
            ),
        nightVision: z.coerce
            .number({
                invalid_type_error:
                    ProductValidationMessage.ADDITIONAL_EQUIPMENT_PRICES
                        .NIGHT_VISION.INVALID,
            })
            .positive(
                ProductValidationMessage.ADDITIONAL_EQUIPMENT_PRICES
                    .NIGHT_VISION.POSITIVE,
            ),
        parachute: z.coerce
            .number({
                invalid_type_error:
                    ProductValidationMessage.ADDITIONAL_EQUIPMENT_PRICES
                        .PARACHUTE.INVALID,
            })
            .positive(
                ProductValidationMessage.ADDITIONAL_EQUIPMENT_PRICES.PARACHUTE
                    .POSITIVE,
            ),
        autopilot: z.coerce
            .number({
                invalid_type_error:
                    ProductValidationMessage.ADDITIONAL_EQUIPMENT_PRICES
                        .AUTOPILOT.INVALID,
            })
            .positive(
                ProductValidationMessage.ADDITIONAL_EQUIPMENT_PRICES.AUTOPILOT
                    .POSITIVE,
            ),
        targetIdentification: z.coerce
            .number({
                invalid_type_error:
                    ProductValidationMessage.ADDITIONAL_EQUIPMENT_PRICES
                        .TARGET_IDENTIFICATION.INVALID,
            })
            .positive(
                ProductValidationMessage.ADDITIONAL_EQUIPMENT_PRICES
                    .TARGET_IDENTIFICATION.POSITIVE,
            ),
        gps: z.coerce
            .number({
                invalid_type_error:
                    ProductValidationMessage.ADDITIONAL_EQUIPMENT_PRICES.GPS
                        .INVALID,
            })
            .positive(
                ProductValidationMessage.ADDITIONAL_EQUIPMENT_PRICES.GPS
                    .POSITIVE,
            ),
    }),
    colorPrice: z.coerce
        .number({
            invalid_type_error: ProductValidationMessage.COLOR_PRICE.INVALID,
        })
        .positive(ProductValidationMessage.COLOR_PRICE.POSITIVE),
    coatingTexturePrice: z.coerce
        .number({
            invalid_type_error:
                ProductValidationMessage.COATING_TEXTURE_PRICE.INVALID,
        })
        .positive(ProductValidationMessage.COATING_TEXTURE_PRICE.POSITIVE),
});

const productValidationSchema = z.object({
    purpose: z
        .string()
        .min(
            ProductValidationRule.PURPOSE.MIN,
            ProductValidationMessage.PURPOSE.INVALID,
        )
        .max(
            ProductValidationRule.PURPOSE.MAX,
            ProductValidationMessage.PURPOSE.INVALID,
        ),
    wingsType: z
        .string()
        .min(
            ProductValidationRule.WINGS_TYPE.MIN,
            ProductValidationMessage.WINGS_TYPE.INVALID,
        )
        .max(
            ProductValidationRule.WINGS_TYPE.MAX,
            ProductValidationMessage.WINGS_TYPE.INVALID,
        ),
    price: productPriceValidationSchema,
    image: z.object(
        {
            id: z.number(),
            url: z.string(),
            key: z.string(),
        },
        { message: ProductValidationMessage.IMAGE.REQUIRED },
    ),
});

export { productValidationSchema };
