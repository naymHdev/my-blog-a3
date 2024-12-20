import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BlogRoutes } from '../modules/blog/blog.route';
import { AdminRoutes } from '../modules/admin/admin.route';

const router = Router();

const blogRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
];

blogRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
