import { User } from '../user.model';
import { IUser } from './user.interface';

const createUserIntoDB = async (userData: IUser): Promise<IUser> => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exists!');
  }

  const result = await User.create(userData);

  return result;
};

const getAllUsersFromDB = async (): Promise<IUser[]> => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (userId: string): Promise<IUser | null> => {
  const result = await User.findOne({ userId });
  return result;
};

const updateSingleUserFromDB = async (
  userId: string,
  userData: IUser,
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate({ userId: userId }, userData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteUserFromDB = async (userId: string) => {
  const result = await User.findOneAndDelete({ userId });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteUserFromDB,
};
