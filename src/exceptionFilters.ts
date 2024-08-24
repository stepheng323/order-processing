import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { isArray } from 'class-validator';
import { Response } from 'express';
import { CustomRes } from './lib/response';

export const getStatusCode = <T>(exception: T): number => {
  return exception instanceof HttpException
    ? exception.getStatus()
    : HttpStatus.INTERNAL_SERVER_ERROR;
};

export const getErrorMessage = <T>(exception: T): string => {
  return exception instanceof HttpException
    ? exception['response']['message']
    : String(exception);
};

@Catch()
export class GlobalExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = getStatusCode<T>(exception);
    const error = getErrorMessage<T>(exception);

    if (statusCode === HttpStatus.UNAUTHORIZED) {
      const exp = exception as any;
      return CustomRes.unauthorized(exp.message);
    }

    response.status(statusCode).json({
      status: false,
      message: 'Bad request',
      data: {
        errors: isArray(error) ? error : [error],
      },
    });
  }
}
