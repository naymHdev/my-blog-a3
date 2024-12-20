import express from 'express';
import { AdminController } from './admin.controller';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.patch('/users/:userId/block', auth('admin'), AdminController.blockUser);

export const AdminRoutes = router;
