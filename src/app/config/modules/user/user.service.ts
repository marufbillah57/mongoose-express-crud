import { UserModel } from '../user.model';
import { IUser } from './user.interface';

const createUserIntoDB = async (user: IUser) => {
  const result = await UserModel.create(user);
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
