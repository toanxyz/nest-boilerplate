import { HttpStatus, HttpException } from '@nestjs/common';

export class ValidationException extends HttpException {
    private errors: string;

    constructor(errs: string) {
        super('ValidationException', HttpStatus.BAD_REQUEST);
        this.errors = errs;
    }

    public getErrors(): string {
        return this.errors;
    }
}
