import { z } from 'zod';

// creating a schema validation using zod
const fullNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'First Name is required',
      invalid_type_error: 'First Name must be a string',
    })
    .trim(),
  lastName: z
    .string({
      required_error: 'Last name is required',
      invalid_type_error: 'last name must be a string',
    })
    .trim(),
});

const addressValidationSchema = z.object({
  street: z
    .string({
      required_error: 'street is required',
      invalid_type_error: 'street must be a string',
    })
    .trim(),
  city: z
    .string({
      required_error: 'city is required',
      invalid_type_error: 'city must be a string',
    })
    .trim(),
  country: z
    .string({
      required_error: 'country is required',
      invalid_type_error: 'country must be a string',
    })
    .trim(),
});

export const userValidationSchema = z.object({
  userId: z
    .number({
      required_error: 'userId is required',
      invalid_type_error: 'userId must be a number',
    })
    .min(0, { message: 'UserId cannot be negative' }),
  username: z
    .string({
      required_error: 'username is required',
      invalid_type_error: 'username must be a string',
    })
    .trim(),
  password: z
    .string()
    .min(6, { message: 'Password must have minimum 6 characters' })
    .max(10, { message: 'Password cannot be greater than 10 characters' }),
  fullName: fullNameValidationSchema,
  age: z.number(),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .trim()
    .email()
    .toLowerCase(),
  isActive: z.boolean({
    required_error: 'isActive is required',
    invalid_type_error: 'isActive must be true or false',
  }),
  hobbies: z.array(
    z.string({
      required_error: 'hobby is required',
      invalid_type_error: 'hobby must be a string',
    }),
  ),
  address: addressValidationSchema,
});


