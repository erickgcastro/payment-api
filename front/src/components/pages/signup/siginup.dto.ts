import { z } from 'zod';

export const signupDTO = z.object({
  name: z
    .string()
    .min(3, 'Name must contain at least 3 characters')
    .regex(/^[a-zA-Z0-9]+$/, 'Name must be Name can only contain letters and numbers'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must contain at least 3 characters'),
});

export type ISignupDTO = z.infer<typeof signupDTO>;
