import * as winston from 'winston';
import { env } from '../core/index';

export function useWinston(): void {
    winston.configure({
        transports: [
            new winston.transports.Console({
                level: env.log.level,
                handleExceptions: true,
                json: env.log.json,
            }),
        ],
    });
}
