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

router.get('/', auth('user'), BlogControllers.getAllBlogs);

export const BlogRoutes = router;
