import { ExceptionFilter, Catch, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { env, LogService, ApiResponse, ApiError } from '../../core/index';
import { DataNotFoundException, ValidationException } from '../exceptions/index';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {

  public isProduction = env.isProduction;

  constructor(private readonly logService: LogService) {
  }

  public catch(exception: any, response: Response): void {
    let err: any = {};

    if (exception instanceof DataNotFoundException) {
      err = {
        error: {
          code: HttpStatus.NO_CONTENT,
          message: 'The resource you requested is no longer available from the servers!',
        } as ApiError,
      } as ApiResponse;
    } else if (exception instanceof ValidationException) {
      err = {
        error: {
          code: HttpStatus.BAD_REQUEST,
          message: 'Input parameters are not valid!',
        } as ApiError,
      } as ApiResponse;
    } else {
      err = {
        error: {
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Server Error',
        } as ApiError,
      } as ApiResponse;
    }

    response.json(err);

    if (this.isProduction) {
      this.logService.error('Error happened!');
    } else {
      this.logService.error('An error has occurred: ' + JSON.stringify(exception));
    }
  }
}
