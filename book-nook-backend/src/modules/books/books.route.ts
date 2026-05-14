import { Router } from "express";
import { booksController } from "./book.controller";

const router = Router();

router.post("/books", booksController.insertBookIntoDb);

export const bookRoutes = router;
