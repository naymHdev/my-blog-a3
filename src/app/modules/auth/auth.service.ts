import { TUser } from './auth.interface';
import { AuthModel } from './auth.model';

const createUserIntoDB = async (payload: TUser): Promise<TUser> => {
  const result = await AuthModel.create(payload);
  return result;
};

export const AuthServices = {
  createUserIntoDB,
};
