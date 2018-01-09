import { ExceptionFilter, Catch, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { env, LogService, ApiResponse, ApiError } from '../../core/index';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {

  public isProduction = env.isProduction;

  constructor(private readonly logService: LogService) {
  }

  public catch(exception: any, response: Response): void {
    response
      .json({
        error: {
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Server Error',
        } as ApiError,
      } as ApiResponse);

    if (this.isProduction) {
      this.logService.error('Internal Server Error');
    } else {
      this.logService.error(exception);
    }
  }
}
