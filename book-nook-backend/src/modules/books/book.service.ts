import { pool } from "../../config/db";
import { ERROR_CODES } from "../../types";
import { AppError } from "../../utils/AppError";
import type { IBook } from "./book.interface";

// insert book into DB
const insertBookIntoDb = async (
  payload: Omit<IBook, "id" | "created_at">,
): Promise<IBook> => {
  const { title, author, genre, published_year, price, stock_quantity } =
    payload;

  if (price < 0 || stock_quantity < 0) {
    throw new AppError(
      "Price and stock quantity must be non-negative values.",
      400,
      ERROR_CODES.VALIDATION_ERROR,
    );
  }

  const res = await pool.query(
    `INSERT INTO books (title, author, genre, published_year, price, stock_quantity) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [title, author, genre, published_year, price, stock_quantity],
  );

  return res.rows[0];
};

// get all book from db
const getAllBooksFromDb = async (): Promise<IBook[]> => {
  const res = await pool.query(`SELECT * FROM books`);
  return res.rows;
};

// get single book from db
const getBookByIdFromDb = async (id: number): Promise<IBook | null> => {
  const res = await pool.query(`SELECT * FROM books WHERE id=$1`, [id]);

  if (!res.rows[0]) {
    throw new AppError("Book not found", 404, ERROR_CODES.BOOK_NOT_FOUND);
  }

  return res.rows[0];
};

// update book
const updateBookByIdFromDb = async (
  id: number,
  payload: Partial<Omit<IBook, "id" | "created_at">>,
): Promise<IBook> => {
  const book_isExist = await pool.query(`SELECT id FROM books WHERE id=$1`, [
    id,
  ]);

  if (book_isExist.rowCount === 0) {
    throw new AppError("Book Not Found", 404, ERROR_CODES.BOOK_NOT_FOUND);
  }

  const keys = Object.keys(payload);
  const values = Object.values(payload);

  if (keys.length === 0) {
    throw new AppError(
      "No fields to update",
      400,
      ERROR_CODES.VALIDATION_ERROR,
    );
  }

  const setClause = keys
    .map((key, index) => `${key}=COALESCE($${index + 1},${key})`)
    .join(",");

  values.push(id);

  const result = await pool.query(
    `UPDATE books SET ${setClause} WHERE id=$${values.length} RETURNING *`,
    values,
  );

  return result.rows[0];
};

// delete book
const deleteBookByIdFromDb = async (id: number): Promise<IBook> => {
  const book_isExist = await pool.query(`SELECT id FROM books WHERE id=$1`, [
    id,
  ]);

  if (book_isExist.rowCount === 0) {
    throw new AppError("Book Not Found", 404, ERROR_CODES.BOOK_NOT_FOUND);
  }

  const res = await pool.query(`DELETE FROM books WHERE id=$1 RETURNING *`, [
    id,
  ]);

  return res.rows[0];
};

export const bookServices = {
  insertBookIntoDb,
  getAllBooksFromDb,
  getBookByIdFromDb,
  updateBookByIdFromDb,
  deleteBookByIdFromDb,
};
