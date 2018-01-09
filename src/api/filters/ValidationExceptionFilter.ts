import { ExceptionFilter, Catch, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { env, LogService, ApiResponse, ApiError } from '../../core/index';
import { ValidationException } from '../../api/exceptions/index';

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {

  public isProduction = env.isProduction;

  constructor(private readonly logService: LogService) {
  }

  public catch(exception: ValidationException, response: Response): void {
    response
      .json({
        error: {
          code: HttpStatus.BAD_REQUEST,
          message: 'Input parameters are not valid!',
        } as ApiError,
      } as ApiResponse);

    if (this.isProduction) {
      this.logService.error('Input parameters are not valid!');
    } else {
      this.logService.error(exception.getErrors());
    }
  }
}
