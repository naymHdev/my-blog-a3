import { z } from 'zod';
import { Role } from './auth.constant';

const UserSchemaValidation = z.object({
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
  role: z.enum([...Role] as [string, ...string[]], {
    required_error: 'Role is required',
  }),
  isBlocked: z.boolean().default(false),
});

export const AuthValidations = {
  UserSchemaValidation,
};
