import { pool } from "../../config/db";
import type { IBook } from "../../types";

const insertBookIntoDb = async (payload: Omit<IBook, "id" | "created_at">) => {
  const { title, author, genre, published_year, price, stock_quantity } =
    payload;

  const res = await pool.query(
    `
            INSERT INTO books (title, author, genre, published_year, price, stock_quantity) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *
            `,
    [title, author, genre, published_year, price, stock_quantity],
  );
  return res?.rows[0];
};

export const bookServices = {
  insertBookIntoDb,
};
