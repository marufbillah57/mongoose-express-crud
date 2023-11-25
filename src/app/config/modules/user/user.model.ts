import { Schema, model } from 'mongoose';
import {
  IAddress,
  IFullName,
  IOrder,
  IUser,
  UserModel,
} from './user.interface';

const fullNameSchema = new Schema<IFullName, UserModel>({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
});

const addressSchema = new Schema<IAddress>({
  street: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
});

const orderSchema = new Schema<IOrder>({
  productName: { type: String, required: true, trim: true },
  price: { type: Number, required: true, trim: true },
  quantity: { type: Number, required: true, trim: true },
});

const userSchema = new Schema<IUser>({
  userId: {
    type: Number,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  password: { type: String, required: true },
  fullName: {
    type: fullNameSchema,
    required: true,
  },
  age: { type: Number, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  isActive: { type: Boolean, required: true },
  hobbies: [{ type: String }],
  address: {
    type: addressSchema,
    required: true,
  },
  orders: { type: [orderSchema] },
});

// creating a custom static method
userSchema.statics.isUserExists = async function (userId: string) {
  const existingUser = await User.findOne({ userId });

  return existingUser;
};

export const User = model<IUser, UserModel>('User', userSchema);
