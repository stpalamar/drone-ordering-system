import { z } from 'zod';

const fileValidationSchema = z.object({
    id: z.number(),
    url: z.string(),
    key: z.string(),
});

export { fileValidationSchema };
