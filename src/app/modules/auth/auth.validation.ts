import { z } from 'zod';
import { Role } from './auth.constant';

const UserSchemaValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Full Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .max(20)
      .min(6),
    role: z
      .enum([...Role] as [string, ...string[]], {
        required_error: 'Role is required',
      })
      .default('user'),
    isBlocked: z.boolean().default(false),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required.' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export const AuthValidations = {
  UserSchemaValidation,
  loginValidationSchema,
};
