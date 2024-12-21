import express from 'express';
import { AuthUserController } from './auth.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validation';
import { auth } from '../../middlewares/auth';

const route = express.Router();

route.post(
  '/register',
  validateRequest(AuthValidations.UserSchemaValidation),
  AuthUserController.registerUser,
);

route.post(
  '/login',
  validateRequest(AuthValidations.loginValidationSchema),
  AuthUserController.loginUser,
);

route.get('/:id', auth('admin'), AuthUserController.findSingleUser);
route.get('/', auth('admin'), AuthUserController.findAllUser);

export const AuthRoutes = route;
