import type { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import { sendSuccess } from "../../utils/response.helper";

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.loginUser(req.body);
    sendSuccess(res, "User Login successfully!", result, 200);
  } catch (error) {
    next(error);
  }
};

export const authController = { loginUser };
