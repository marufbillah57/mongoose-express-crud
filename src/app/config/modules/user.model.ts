import { Schema, model } from 'mongoose';
import { IUser } from './user/user.interface';

const userSchema = new Schema<IUser>({
  userId: { type: Number, unique: true },
  username: { type: String, unique: true },
  password: { type: String },
  fullName: {
    firstName: { type: String, required: [true, 'First name is required'] },
    lastName: { type: String, required: [true, 'Last name is required'] },
  },
  age: { type: Number },
  email: {
    type: String,
    unique: true,
    required: [true, 'User email is required'],
  },
  isActive: { type: Boolean, default: true },
  hobbies: [{ type: String }],
  address: {
    street: { type: String, required: [true, 'User street is required'] },
    city: { type: String, required: [true, 'User city is required'] },
    country: { type: String, required: [true, 'User country is required'] },
  },
  orders: [{ type: String }],
});

export const UserModel = model('User', userSchema);
