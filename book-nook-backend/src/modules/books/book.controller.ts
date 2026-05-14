import type { NextFunction, Request, Response } from "express";
import { bookServices } from "./book.service";
import {
  sendCreated,
  sendError,
  sendSuccess,
} from "../../utils/response.helper";
import { ERROR_CODES } from "../../types";

// insert book into db
const insertBookIntoDb = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await bookServices.insertBookIntoDb(req.body);

    sendCreated(res, "Book inserted successfully!!", result);
  } catch (error) {
    next(error);
  }
};

// get book from db
const getAllBooksFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await bookServices.getAllBooksFromDb();
    sendSuccess(res, "Books retrieved successfully!!", result);
  } catch (error) {
    next(error);
  }
};

// get single book
const getBookByIdFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await bookServices.getBookByIdFromDb(Number(req.params.id));

    sendSuccess(res, "Book retrieved successfully!!", result);
  } catch (error) {
    next(error);
  }
};

// update book
const updateBookByIdFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await bookServices.updateBookByIdFromDb(
      Number(req.params.id),
      req.body,
    );

    sendSuccess(res, "Book updated successfully!!", result, 200);
  } catch (error) {
    next(error);
  }
};

// delete book
const deleteBookByIdFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await bookServices.deleteBookByIdFromDb(
      Number(req.params.id),
    );

    sendSuccess(res, "Book deleted successfully!!", result, 200);
  } catch (error) {
    next(error);
  }
};

export const booksController = {
  insertBookIntoDb,
  getAllBooksFromDb,
  getBookByIdFromDb,
  updateBookByIdFromDb,
  deleteBookByIdFromDb,
};
