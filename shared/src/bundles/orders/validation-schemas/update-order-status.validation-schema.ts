import { z } from 'zod';

import { OrderStatus, OrderValidationMessage } from '../enums/enums.js';

const updateOrderStatusValidationSchema = z.object({
    status: z.nativeEnum(OrderStatus, {
        required_error: OrderValidationMessage.status.FIELD_REQUIRED,
        invalid_type_error: OrderValidationMessage.status.FIELD_INVALID,
    }),
});

export { updateOrderStatusValidationSchema };
