import express from 'express';
import { BlogControllers } from './blog.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.validation';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-blog',
  auth('user'),
  validateRequest(BlogValidations.blogValidationSchema),
  BlogControllers.createBlog,
);

router.patch(
  '/:id',
  auth('user'),
  validateRequest(BlogValidations.updateBlogValidationSchema),
  BlogControllers.updateBlog,
);

router.delete('/:id', auth('user', 'admin'), BlogControllers.deleteBlog);

router.get('/', BlogControllers.getAllBlogs);

export const BlogRoutes = router;
