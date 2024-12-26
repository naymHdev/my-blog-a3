/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from 'mongoose';
import { BlogSearchableFields } from './blog.constant';
import { BlogQueryParams, TBlog } from './blog.interface';
import { BlogModel } from './blog.model';
import AppError from '../../errors/appError';
import { StatusCodes } from 'http-status-codes';

const createBlogIntoDB = async (user: any, payload: TBlog) => {
  payload.author = user._id;

  const result = await BlogModel.create(payload);

  return result.populate('author');
};

const getAllBlogsFromDB = async (query: BlogQueryParams) => {
  const { search, sortBy = 'createdAt', sortOrder = 'desc', filter } = query;

  const searchCriteria: any = search
    ? {
        $or: BlogSearchableFields.map((field) => ({
          [field]: { $regex: search, $options: 'i' },
        })),
      }
    : {};

  const filterCriteria: any = filter
    ? { author: new mongoose.Types.ObjectId(filter) }
    : {};

  const sortCriteria: any = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

  const blogsQuery = await BlogModel.find({
    ...searchCriteria,
    ...filterCriteria,
  })
    .sort(sortCriteria)
    .populate('author');

  return blogsQuery;
};

const updateBlogFromDB = async (
  userId: string,
  id: string,
  payload: Partial<TBlog>,
) => {
  const blog = await BlogModel.findById(id).populate('author');
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found!');
  }

  const blogAuthorId = blog.author?._id;

  if (blogAuthorId && blogAuthorId.toString() == userId) {
    const updateBlog = await BlogModel.findByIdAndUpdate(
      id,
      {
        $set: payload,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    return updateBlog.populate('author');
  } else {
    throw new AppError(StatusCodes.BAD_REQUEST, 'You did not updated the blog');
  }
};

const deleteBlogFromDB = async (userId: string, id: string) => {
  const blog = await BlogModel.findById(id).populate('author');
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found!');
  }

  const blogAuthorId = blog.author?._id;

  if (blogAuthorId && blogAuthorId.toString() == userId) {
    await BlogModel.findByIdAndDelete(id);
  } else {
    throw new AppError(StatusCodes.BAD_REQUEST, 'You did not deleted the blog');
  }
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  updateBlogFromDB,
  deleteBlogFromDB,
};
