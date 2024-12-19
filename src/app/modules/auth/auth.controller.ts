import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const createUser = catchAsync(async (req, res) => {
  const result = await AuthServices.createUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    message: 'User created successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

export const AuthUserController = {
  createUser,
};
