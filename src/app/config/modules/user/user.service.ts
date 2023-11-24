import { UserModel } from '../user.model';
import { IUser } from './user.interface';

const createUserIntoDB = async (user: IUser) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

const updateSingleUserFromDB = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

const deleteUserFromDB = async (userId: string) => {
  const result = await UserModel.deleteOne({ userId });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteUserFromDB,
};
