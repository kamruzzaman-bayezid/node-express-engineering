import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post("/", userController.createUserIntoDb);
router.get("/", userController.getUsersFromDb);

export const userRoutes = router;
