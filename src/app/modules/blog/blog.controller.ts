import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.createBlogIntoDB(req.body);

  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {

  const result = await BlogServices.getAllBlogsFromDB();

  sendResponse(res, {
    success: true,
    message: 'All Blogs fetched successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
};
