/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface IFullName {
  firstName: string;
  lastName: string;
}

export interface IAddress {
  street: string;
  city: string;
  country: string;
}

export interface IOrder {
  productName: string;
  price: number;
  quantity: number;
}

export interface IUser {
  userId: number;
  username: string;
  password: string;
  fullName: IFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: Array<string>; // string[]
  address: IAddress;
  orders?: Array<IOrder>; //Order[]
}

export type TUserPartial = Partial<IUser>;

// for creating static
export interface UserModel extends Model<IUser> {
  isUserExists(userId: string): Promise<IUser | null>;
}
