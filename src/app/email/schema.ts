import { z } from 'zod';

export const emailSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});
export type EmailFormData = z.infer<typeof emailSchema>;
