import 'reflect-metadata';
import * as cors from 'cors';
import * as helmet from 'helmet';

import { NestFactory } from '@nestjs/core';

import { env, banner, LogService } from './core/index';
import { useWinston, useSwagger } from './loaders/index';

import { ApplicationModule } from './applicationModule';
import { AnyExceptionFilter } from './api/filters/index';
import { ValidationPipe } from './api/pipes/index';

const log = new LogService();

async function bootstrap(): Promise<any> {
    const app = await NestFactory.create(ApplicationModule);

    useWinston();
    useSwagger(log, app);

    app.use(cors());
    app.use(helmet());
    app.setGlobalPrefix(env.app.routePrefix);
    app.useGlobalFilters(app.select(ApplicationModule).get(AnyExceptionFilter));
    app.useGlobalPipes(app.select(ApplicationModule).get(ValidationPipe));

    await app.listen(env.app.port);
}

bootstrap()
    .then(() => banner(log))
    .catch(error => log.error('Application is crashed: ' + error));
