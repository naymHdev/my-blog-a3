/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { TErrorSources } from '../interface/error.interface';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import { handleValidationError } from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import { handleDuplicateError } from '../errors/handleDuplicateError';
import AppError from '../errors/appError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Setting up default values
  let statusCode: number = 500;
  let message: string = 'Something went wrong';

  let error: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    error = simplifiedError.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    error = simplifiedError.errorSources;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    error = simplifiedError.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    error = simplifiedError.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    error = [
      {
        path: '',
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    error = [
      {
        path: '',
        message: err.message,
      },
    ];
  }

  // Ultimate return
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error,
    stack: err.stack,
  });
};

export default globalErrorHandler;
