import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { env, LogService } from '../core/index';

export function useSwagger(log: LogService, app: INestApplication): void {
    if (env.swagger.enabled) {
        const options = new DocumentBuilder()
            .setTitle(env.app.name)
            .setBasePath(env.app.routePrefix)
            .setDescription(env.app.description)
            .setVersion(env.app.version)
            .build();
        const document = SwaggerModule.createDocument(app, options);

        SwaggerModule.setup(env.swagger.route, app, document);
    }
}
