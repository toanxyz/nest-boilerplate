import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';

import { InfoController, TestController } from './api/controllers/index';

import { TestService } from './api/services/index';

import { TestRepository } from './api/repositories/index';

import { LogService } from './core/index';
import { HttpRequestLoggerMiddleware } from './api/middlewares/index';
import { AnyExceptionFilter } from './api/filters/index';
import { ValidationPipe } from './api/pipes/index';

@Module({
    imports: [],
    controllers: [
        InfoController,
        TestController,
    ],
    components: [
        // Helpers
        LogService,

        // Filters
        AnyExceptionFilter,

        // Pipes
        ValidationPipe,

        // Business Services
        TestService,

        // Repositories
        TestRepository,
    ],
})
export class ApplicationModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer): void {
        consumer
            .apply(HttpRequestLoggerMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
