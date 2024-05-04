import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema<object>) {}

    async transform(value: unknown) {
        try {
            this.schema.parse(value);
            return value;
        } catch (error) {
            throw new BadRequestException(error.errors);
        }
    }
}
