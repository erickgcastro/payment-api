import { z } from 'zod';

export const formDTO = z.object({
  recipient: z
    .string()
    .min(3, 'Invalid username')
    .transform((v) => v.toLowerCase()),
  amount: z
    .string()
    .min(1, 'Min 0,01')
    .refine((v) => /^\d+(\.\d{1,2})?$/.test(v))
    .transform((val) => Math.round(parseFloat(val) * 100).toString())
    .refine((v) => +v > 0, 'Min 0,01'),
});

export type IFormDTO = z.infer<typeof formDTO>;
