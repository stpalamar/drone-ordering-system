import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'yup';

export class YupValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema<object>) {}

    async transform(value: unknown) {
        try {
            this.schema.validateSync(value, { abortEarly: false });
            return value;
        } catch (error) {
            throw new BadRequestException(error.errors);
        }
    }
}
