import { Schema, model } from 'mongoose';
import { Address, FullName, IUser } from './user/user.interface';

const fullNameSchema = new Schema<FullName>({
  firstName: { type: String },
  lastName: { type: String },
});

const addressSchema = new Schema<Address>({
  street: { type: String },
  city: { type: String },
  country: { type: String },
});

const userSchema = new Schema<IUser>({
  userId: { type: Number },
  username: { type: String },
  password: { type: String },
  fullName: fullNameSchema,
  age: { type: Number },
  email: {
    type: String,
  },
  isActive: { type: Boolean, default: true },
  hobbies: [{ type: String }],
  address: addressSchema,
  orders: [{ type: String }],
});

export const UserModel = model<IUser>('User', userSchema);
