import { Component } from '@nestjs/common';
import { LogService } from '../../core/index';

@Component()
export class TestService {

    constructor(private readonly logService: LogService) {
    }

    public test(): string {
        return 'logService';
    }
}
