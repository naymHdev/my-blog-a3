/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from 'mongoose';
import { BlogSearchableFields } from './blog.constant';
import { BlogQueryParams, TBlog } from './blog.interface';
import { BlogModel } from './blog.model';

const createBlogIntoDB = async (payload: TBlog) => {
  const result = await BlogModel.create(payload);
  return result.populate('author');
};

const getAllBlogsFromDB = async (query: BlogQueryParams) => {
  const { search, sortBy = 'createdAt', sortOrder = 'desc', filter } = query;

  // console.log('query', query);

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

const updateBlogFromDB = async (id: string, payload: Partial<TBlog>) => {
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
};

const deleteBlogFromDB = async (id: string) => {
  const deleteBlog = await BlogModel.findByIdAndDelete(id);
  return deleteBlog;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  updateBlogFromDB,
  deleteBlogFromDB,
};
