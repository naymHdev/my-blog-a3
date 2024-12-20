import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  if (req.user?.role !== 'admin') {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'Access denied! Only admin can block user',
    );
  }

  const result = await AdminServices.blockUserFromDB(userId);

  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AdminServices.deleteBlogFromDB(id);

  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const AdminController = {
  blockUser,
  deleteBlog,
};
