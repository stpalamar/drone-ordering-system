import { productValidationSchema } from '~/bundles/products/validation-schemas/validation-schemas.js';

const createProductValidationSchema = productValidationSchema.omit({
    image: true,
});

export { createProductValidationSchema };
