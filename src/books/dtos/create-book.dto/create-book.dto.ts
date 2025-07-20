import { z } from 'zod';

export const CreateBookDtoSchema = z.object({
  isbn: z.string(),
  title: z.string(),
  authors: z.array(z.string().nonempty()),
  amount: z.number().positive(),
  price: z.number().positive(),
  thumbnail: z.url().optional()
});

export type CreateBookDto = z.infer<typeof CreateBookDtoSchema>;
