import { User } from './user.model';
import { IOrder, IUser } from './user.interface';

// create new user and save in database
const createUserIntoDB = async (userData: IUser): Promise<IUser> => {
  const result = await User.create(userData);

  return result;
};

// fetch all users from database
const getAllUsersFromDB = async (): Promise<IUser[]> => {
  const result = await User.find({}).select(
    '-password -__v -orders -hobbies -isActive -_id -fullName._id -address._id',
  );
  return result;
};

// fetch single user from database
const getSingleUserFromDB = async (userId: number): Promise<IUser | null> => {
  const result = await User.findOne({ userId }).select(
    '-password -__v -orders -_id -fullName._id -address._id',
  );
  return result;
};

// update an existing user
const updateSingleUserFromDB = async (
  userId: number,
  userData: IUser,
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate({ userId }, userData);
  return result;
};

// delete an existing user
const deleteUserFromDB = async (userId: number) => {
  return await User.findOneAndDelete({ userId });
};

// create new order and save in user collection
const createOrderOfUser = async (userId: number, order: IOrder) => {
  return User.updateOne({ userId }, { $push: { orders: order } });
};

// get all orders
const getAllOrdersOfUser = async (userId: number) => {
  const result = await User.findOne({ userId }).select('orders -_id');

  if (result?.orders?.length && result.orders.length > 0) {
    return result;
  } else {
    return { description: 'No orders found!' };
  }
};

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteUserFromDB,
  createOrderOfUser,
  getAllOrdersOfUser,
};
