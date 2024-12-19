import express from 'express';
import { AuthUserController } from './auth.controller';
import { AuthValidations } from './auth.validation';
import { validateRequest } from '../../middlewares/validateRequest';

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

route.get('/:id', AuthUserController.findSingleUser);
route.get('/', AuthUserController.findAllUser);

export const AuthRoutes = route;