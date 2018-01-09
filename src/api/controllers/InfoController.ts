import { Controller, Get } from '@nestjs/common';
import { BaseController } from './BaseController';
import { env, LogService } from '../../core/index';
import { TestRepository } from '../repositories/index';

@Controller('info')
export class InfoController extends BaseController {

    constructor(
        private readonly logService: LogService,
        private readonly testRepository: TestRepository) {
        super();
    }

    @Get()
    public getInfo(): any {
        this.logService.debug('getInfo method executing');
        let a = this.testRepository.test();
        return this.single({
            name: env.app.name,
            version: env.app.version,
            description: env.app.description,
        });
    }
}
