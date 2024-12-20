/* eslint-disable no-unused-vars */

import { Model } from 'mongoose';
import { USER_ROLE } from './auth.constant';

export type TRole = 'admin' | 'user';

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: TRole;
  isBlocked: boolean;
}

export type TLoginUser = {
  email: string;
  password: string;
};

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomEmail(email: string): Promise<TUser>;
  isUserPasswordMatch(plainTextPass: string, hasPass: string): Promise<boolean>;
}

// Manage user role with token

export type TUserRole = keyof typeof USER_ROLE;
