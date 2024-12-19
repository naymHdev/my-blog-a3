import QueryBuilder from '../../builder/QueryBuilder';
import { BlogSearchableFields } from './blog.constant';
import { TBlog } from './blog.interface';
import { BlogModel } from './blog.model';

const createBlogIntoDB = async (payload: TBlog) => {
  const result = await BlogModel.create(payload);
  return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(
    BlogModel.find().populate({
      path: 'author',
      select: 'name',
    }),
    query,
  )
    .search(BlogSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await blogQuery.modelQuery;
  return result;
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

  return updateBlog;
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
