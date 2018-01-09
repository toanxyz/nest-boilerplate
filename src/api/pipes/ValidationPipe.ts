import { PipeTransform, Pipe, ArgumentMetadata } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ValidationException } from '../../api/exceptions/index';

@Pipe()
export class ValidationPipe implements PipeTransform<any> {
    public async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const { metatype } = metadata;
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors: ValidationError[] = await validate(object);
        if (errors.length > 0) {
            throw new ValidationException(JSON.stringify(errors));
        }
        return value;
    }

    private toValidate(metatype: any): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find((type) => metatype === type);
    }
}
