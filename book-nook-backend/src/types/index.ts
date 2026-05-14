export interface IBook {
  id: number;
  title: string;
  author: string;
  genre: string;
  published_year: number;
  price: number;
  stock_quantity: number;
  created_at: Date;
}

export const ERROR_CODES = {
  BOOK_NOT_FOUND: "BOOK_NOT_FOUND",
  BOOK_ALREADY_EXISTS: "BOOK_ALREADY_EXISTS",

  VALIDATION_ERROR: "VALIDATION_ERROR",

  INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;
