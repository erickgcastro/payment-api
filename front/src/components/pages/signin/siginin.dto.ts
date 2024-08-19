import { z } from 'zod';

export const siginDTO = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type ISiginDTO = z.infer<typeof siginDTO>;
