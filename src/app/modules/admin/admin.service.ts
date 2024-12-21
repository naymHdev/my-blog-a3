import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import { User } from '../auth/auth.model';
import { BlogModel } from '../blog/blog.model';

const blockUserFromDB = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  if (user && user.role === 'admin') {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Admin Do not Blocking admin!');
  }

  if (user.isBlocked) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User is already blocked');
  }

  user.isBlocked = true;
  await user.save();

  return user;
};

const deleteBlogFromDB = async (id: string) => {
  const blog = await BlogModel.findByIdAndDelete(id);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found to delete it!');
  }

  return blog;
};

export const AdminServices = {
  blockUserFromDB,
  deleteBlogFromDB,
};
