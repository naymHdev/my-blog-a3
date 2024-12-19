import express from 'express';
import { AuthUserController } from './auth.controller';

const route = express.Router();

route.post('/register', AuthUserController.createUser);
// route.post('/login', AuthUserController);
// route.post('/', AuthUserController);

export const AuthRoutes = route;
