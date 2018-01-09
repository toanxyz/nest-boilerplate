import * as winston from 'winston';
import { Component } from '@nestjs/common';

@Component()
export class LogService {

    public static DEFAULT_SCOPE = 'app';

    public debug(message: string, ...args: any[]): void {
        this.log('debug', message, args);
    }

    public info(message: string, ...args: any[]): void {
        this.log('info', message, args);
    }

    public warn(message: string, ...args: any[]): void {
        this.log('warn', message, args);
    }

    public error(message: string, ...args: any[]): void {
        this.log('error', message, args);
    }

    private log(level: string, message: string, args: any[]): void {
        if (winston) {
            winston[level](`${LogService.DEFAULT_SCOPE} ${message}`, args);
        }
    }
}
