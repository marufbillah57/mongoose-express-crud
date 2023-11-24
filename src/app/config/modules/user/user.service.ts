import { UserModel } from '../user.model';
import { IUser } from './user.interface';

const createUserIntoDB = async (userData: IUser): Promise<IUser> => {
  const result = await UserModel.create(userData);
  return result;
};

const getAllUsersFromDB = async (): Promise<IUser[]> => {
  const result = await UserModel.find();
  return result;
};

const getSingleUserFromDB = async (userId: string): Promise<IUser | null> => {
  const result = await UserModel.findOne({ userId });
  return result;
};

const updateSingleUserFromDB = async (
  userId: string,
  userData: IUser,
): Promise<IUser | null> => {
  const result = await UserModel.findOneAndUpdate(
    { userId: userId },
    userData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const deleteUserFromDB = async (userId: string) => {
  const result = await UserModel.findOneAndDelete({ userId });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteUserFromDB,
};
