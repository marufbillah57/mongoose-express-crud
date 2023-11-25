import { z } from 'zod';

export const orderValidationSchema = z.object({
  productName: z
    .string({
      required_error: 'product name is required',
      invalid_type_error: 'product name must be a string',
    })
    .trim(),
  price: z.number({
    required_error: 'price is required',
    invalid_type_error: 'price must be a number',
  }),
  quantity: z
    .number({
      required_error: 'quantity is required',
      invalid_type_error: 'quantity must be a number',
    })
    .min(1, { message: 'quantity must be greater than zero' }),
});
