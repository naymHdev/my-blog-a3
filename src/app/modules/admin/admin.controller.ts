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
    statusCode: 200,
    data: result,
  });
});

export const AdminController = {
  blockUser,
};
