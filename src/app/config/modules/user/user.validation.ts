import { z } from 'zod';

// creating a schema validation using zod]
const fullNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, { message: 'first name can not be more than 20 characters' })
    .trim(),
  lastName: z.string().trim(),
});

const addressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const orderValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: fullNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.string().array(),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema),
});
