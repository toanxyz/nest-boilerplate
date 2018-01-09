import { HttpStatus, HttpException } from '@nestjs/common';

export class DataNotFoundException extends HttpException {
    constructor() {
        super('DataNotFoundException', HttpStatus.BAD_REQUEST);
    }
}
