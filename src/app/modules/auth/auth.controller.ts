import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import AppError from '../../errors/appError';

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    message: 'User created successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUserFromDB(req.body);

  sendResponse(res, {
    success: true,
    message: 'User login successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const findSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AuthServices.findSingleUserFromDB(id);

  sendResponse(res, {
    success: true,
    message: 'User found successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const findAllUser = catchAsync(async (req, res) => {
  if (req.user?.role !== 'admin') {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User not fetching all users');
  }

  const result = await AuthServices.findAllUserFromDB();

  sendResponse(res, {
    success: true,
    message: 'User found successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const AuthUserController = {
  registerUser,
  findSingleUser,
  findAllUser,
  loginUser,
};
