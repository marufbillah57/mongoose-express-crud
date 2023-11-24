import { Schema, model } from 'mongoose';
import { Address, FullName, IUser, Product } from './user/user.interface';

const fullNameSchema = new Schema<FullName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name is required'],
    maxlength: [20, 'First name can not be more than 20 characters'],
    validate: {
      validator: function (value: string) {
        const firstName = value.charAt(0).toUpperCase() + value.slice(1);
        return firstName === value;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required'],
  },
});

const addressSchema = new Schema<Address>({
  street: { type: String, trim: true },
  city: { type: String, trim: true },
  country: { type: String, trim: true },
});

const productSchema = new Schema<Product>({
  productName: String,
  price: Number,
  quantity: Number,
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
    trim: true,
    required: [true, 'User name is required'],
  },
  password: { type: String, required: [true, 'User password is required'] },
  fullName: {
    type: fullNameSchema,
    required: true,
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
  orders: [productSchema],
});

export const UserModel = model<IUser>('User', userSchema);
