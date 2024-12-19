import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';

const router = Router();

const blogRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

blogRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
