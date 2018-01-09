
import * as morgan from 'morgan';
import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';
import { env, LogService } from '../../core/index';

@Middleware()
export class HttpRequestLoggerMiddleware implements NestMiddleware {
    constructor(private readonly logService: LogService) {
    }

    public resolve(...args: any[]): ExpressMiddleware {
        return morgan(env.log.output, {
            stream: {
                write: this.logService.info.bind(this.logService),
            },
        });
    }
}
