import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';

const router = Router();

const blogRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
];

blogRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
