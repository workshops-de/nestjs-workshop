export type CreateBookDto = {
  isbn: string;
  title: string;
  authors: string[];
  price: number;
  amount?: number;
  thumbnail?: string;
};
