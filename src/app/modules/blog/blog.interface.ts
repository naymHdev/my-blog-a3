import { Types } from 'mongoose';

export type TBlog = {
  title: string;
  content: string;
  user: Types.ObjectId;
};
