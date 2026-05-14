import { Router } from "express";
import { booksController } from "./book.controller";

const router = Router();

router.post("/books", booksController.insertBookIntoDb);
router.get("/books", booksController.getAllBooksFromDb);
router.get("/books/:id", booksController.getBookByIdFromDb);
router.put("/books/:id", booksController.updateBookByIdFromDb);
router.delete("/books/:id", booksController.deleteBookByIdFromDb);

export const bookRoutes = router;
