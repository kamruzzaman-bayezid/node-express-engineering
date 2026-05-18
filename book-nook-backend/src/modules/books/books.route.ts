import { Router } from "express";
import { booksController } from "./book.controller";

const router = Router();

router.post("/", booksController.insertBookIntoDb);
router.get("/", booksController.getAllBooksFromDb);
router.get("/:id", booksController.getBookByIdFromDb);
router.put("/:id", booksController.updateBookByIdFromDb);
router.delete("/:id", booksController.deleteBookByIdFromDb);

export const bookRoutes = router;
