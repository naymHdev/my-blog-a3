/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TErrorSources,
  TGenericErrorResponse,
} from '../interface/error.interface';

export const handleDuplicateError = (error: any): TGenericErrorResponse => {
  const match = error.message.match(/"([^"]*)"/);

  const extractErrorMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractErrorMessage} --<--- Its already exist`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Duplicate error',
    errorSources,
  };
};
