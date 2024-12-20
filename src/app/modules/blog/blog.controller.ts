import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

// create
const createBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.createBlogIntoDB(req.body);

  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

// read
const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogsFromDB(
    req.query as Record<string, unknown>,
  );

  sendResponse(res, {
    success: true,
    message: 'Blogs fetched successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

// update
const updateBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.updateBlogFromDB(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

// delete
const deleteBlog = catchAsync(async (req, res) => {
  await BlogServices.deleteBlogFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
    data: null,
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};
