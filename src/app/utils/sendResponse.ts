import { Response } from 'express';

interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export const sendResponse = <T>(res: Response, data: IResponse<T>) => {
  const response: Partial<IResponse<T>> = {
    success: data.success,
    message: data.message,
    statusCode: data.statusCode,
  };

  if (data.data !== undefined && data.data !== null) {
    response.data = data.data;
  }

  res.status(data?.statusCode).json(response);
};
