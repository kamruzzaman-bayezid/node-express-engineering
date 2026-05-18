import type { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import {
  sendCreated,
  sendError,
  sendSuccess,
} from "../../utils/response.helper";
import { ERROR_CODES } from "../../types";

const createUserIntoDb = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return sendError(
        res,
        400,
        "Request body cannot be empty!",
        ERROR_CODES.VALIDATION_ERROR,
      );
    }

    const { name, email, password, age } = req.body;
    if (!name || !email || !password || !age) {
      return sendError(
        res,
        400,
        "Missing required fields: name, email, or password",
        ERROR_CODES.VALIDATION_ERROR,
      );
    }

    const result = await userService.createUserIntoDb(req.body);
    sendCreated(res, "User created successfully!", result);
  } catch (error) {
    next(error);
  }
};

const getUsersFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await userService.getUsersFromDb();
    sendSuccess(res, "Users retrieved successfully!", result, 200);
  } catch (error) {
    next(error);
  }
};

export const userController = { createUserIntoDb, getUsersFromDb };
