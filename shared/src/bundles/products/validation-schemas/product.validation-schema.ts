import { z } from 'zod';

import {
    ProductValidationMessage,
    ProductValidationRule,
} from '../enums/enums.js';

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
    basePrice: z.coerce
        .number({
            invalid_type_error: ProductValidationMessage.BASE_PRICE.INVALID,
        })
        .positive(ProductValidationMessage.BASE_PRICE.POSITIVE),
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
