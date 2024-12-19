import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import { TLoginUser, TUser } from './auth.interface';
import { AuthModel } from './auth.model';
import { createToken } from './auth.utils';
import config from '../../config';

const registerUserIntoDB = async (payload: TUser): Promise<TUser> => {
  const result = await AuthModel.create(payload);
  return result;
};

const loginUserFromDB = async (payload: TLoginUser) => {
  const user = await AuthModel.isUserExistsByCustomEmail(payload.email);

  // Check user exist or no!
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  // Check user is blocked!
  if (user.isBlocked) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User is blocked');
  }

  // Check password match
  if (!(await AuthModel.isUserPasswordMatch(payload.password, user.password))) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Invalid password');
  }

  // Create token use jwt and sent to the client
  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret_token as string,
    config.jwt_access_expire_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret_token as string,
    config.jwt_refresh_expire_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };

  // ------ END ------
};

const findSingleUserFromDB = async (id: string) => {
  const result = await AuthModel.findById(id);
  return result;
};

const findAllUserFromDB = async () => {
  const result = await AuthModel.find();
  return result;
};

export const AuthServices = {
  registerUserIntoDB,
  findSingleUserFromDB,
  findAllUserFromDB,
  loginUserFromDB,
};
