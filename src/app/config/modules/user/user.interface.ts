export interface FullName {
  firstName: string;
  lastName: string;
}

export interface Address {
  street: string;
  city: string;
  country: string;
}

export interface IUser {
  userId: number;
  username: string;
  password: string;
  fullName: FullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: Address;
  orders: [
    {
      productName: string;
      price: number;
      quantity: number;
    },
  ];
}
