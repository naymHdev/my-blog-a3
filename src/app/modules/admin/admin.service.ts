import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import { User } from '../auth/auth.model';

const blockUserFromDB = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  if (user.isBlocked) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User is already blocked');
  }

  user.isBlocked = true;
  await user.save();

  return user;
};

export const AdminServices = {
  blockUserFromDB,
};
