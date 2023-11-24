import { Schema, model } from 'mongoose';
import { Address, FullName, IUser } from './user/user.interface';

const fullNameSchema = new Schema<FullName>({
  firstName: { type: String, required: [true, 'First name is required'] },
  lastName: { type: String, required: [true, 'Last name is required'] },
});

const addressSchema = new Schema<Address>({
  street: { type: String },
  city: { type: String },
  country: { type: String },
});

const userSchema = new Schema<IUser>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'User Id is required'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'User name is required'],
  },
  password: { type: String, required: [true, 'User password is required'] },
  fullName: {
    type: fullNameSchema,
    required: [true, ''],
  },
  age: { type: Number },
  email: {
    type: String,
  },
  isActive: { type: Boolean, default: true },
  hobbies: [{ type: String }],
  address: {
    type: addressSchema,
    required: true,
  },
  orders: [{ type: String }],
});

export const UserModel = model<IUser>('User', userSchema);
