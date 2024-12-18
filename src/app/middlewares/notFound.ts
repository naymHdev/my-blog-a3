/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'API not found',
    error: '',
  });
};

export default notFound;
