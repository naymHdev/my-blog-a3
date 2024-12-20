import { BlogSearchableFields } from './blog.constant';
import { TBlog } from './blog.interface';
import { BlogModel } from './blog.model';

const createBlogIntoDB = async (payload: TBlog) => {
  const result = await BlogModel.create(payload);
  return result.populate('author');
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };

  let search = '';
  if (query?.search) {
    search = query?.search as string;
  }

  // Searching
  const searchQuery = BlogModel.find({
    $or: BlogSearchableFields.map((field) => ({
      [field]: { $regex: search, $options: 'i' },
    })),
  });

  // Filtering
  const excludedFields = ['search', 'sortBy'];
  excludedFields.forEach((el) => delete queryObj[el]);

  const filterQuery = searchQuery.find(queryObj).populate({
    path: 'author',
    select: 'name',
  });

  // Shorting
  let sortBy = '-createdAt';
  if (query?.sortBy) {
    sortBy = query?.sortBy as string;
  }

  const sortQuery = await filterQuery.sort(sortBy);
  return sortQuery;
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
