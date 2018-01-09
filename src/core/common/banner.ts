import { env } from './env';
import { LogService } from '../index';

export function banner(log: LogService): void {
    if (env.app.banner) {
        log.info(`The application is ready on ${env.app.route}${env.app.routePrefix}`);
        log.info(`To shut it down, press <CTRL> + C at any time.`);
        log.info(``);
        log.info('-------------------------------------------------------');
        log.info(`Environment  : ${env.node}`);
        log.info(`Version      : ${env.app.version}`);
        log.info(``);
        log.info(`API Info     : ${env.app.route}${env.app.routePrefix}`);
        if (env.swagger.enabled) {
            log.info(`Swagger      : ${env.app.route}${env.swagger.route}`);
        }
        log.info('-------------------------------------------------------');
    } else {
        log.info(`Application is up and running.`);
    }
}
