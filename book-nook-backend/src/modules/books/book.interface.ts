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
