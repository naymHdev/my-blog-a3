import express from 'express';
import { AdminController } from './admin.controller';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.patch('/users/:userId/block', auth('admin'), AdminController.blockUser);

router.delete('/blogs/:id', auth('admin'), AdminController.deleteBlog);

export const AdminRoutes = router;
