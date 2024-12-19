import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../modules/auth/auth.interface';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../errors/appError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/auth/auth.model';

export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'You are not logged in! Please log in to get access.',
      );
    }

    // verify token
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret_token as string,
    ) as JwtPayload;

    // console.log('decode-->', decoded);

    const { role, userEmail } = decoded;

    const user = await User.isUserExistsByCustomEmail(userEmail);

    // console.log('user-token-->', user);

    // Check user exist or no!
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
    }

    // Check user is blocked!
    if (user.isBlocked) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'User is blocked');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        'You do not have access to perform this action',
      );
    }

    req.user = decoded as JwtPayload;
    next();

    // ---------- END --------- //
  });
};
