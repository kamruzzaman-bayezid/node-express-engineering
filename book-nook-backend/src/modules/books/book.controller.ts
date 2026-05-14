import type { Request, Response } from "express";

const insertBookIntoDb = async (req: Request, res: Response) => {
  const bookData = req?.body;
  try {
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error?.message : "Something is wrong";

      // res.status()
  }
  console.log("book data:", bookData);
};

export const booksController = { insertBookIntoDb };
