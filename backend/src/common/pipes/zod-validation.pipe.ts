import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema<object>) {}

    async transform(value: unknown) {
        try {
            return this.schema.parse(value);
        } catch (error) {
            throw new BadRequestException(error.errors);
        }
    }
}

export { ZodValidationPipe };
