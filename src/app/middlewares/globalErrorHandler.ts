/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { TErrorSources } from '../interface/error.interface';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import { handleValidationError } from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import { handleDuplicateError } from '../errors/handleDuplicateError';
import AppError from '../errors/appError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode: number = 500;
  let message: string = 'Something went wrong';

  let errorSource: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSources;
  } else if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSources;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSources;
  } else if (error?.code === 11000) {
    const simplifiedError = handleDuplicateError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSources;
  } else if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorSource = [
      {
        path: '',
        message: error?.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error?.message;
    errorSource = [
      {
        path: '',
        message: error?.message,
      },
    ];
  }
  // Return
  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    error,
    stack: error?.stack,
  });
};

export default globalErrorHandler;
