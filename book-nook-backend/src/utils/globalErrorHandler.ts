import type { NextFunction, Request, Response } from "express";
import { sendError } from "./response.helper";
import { ERROR_CODES } from "../types";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err?.statusCode ?? 500;
  const message = err?.message ?? "Something went wrong";
  const errorCode = err?.errorCode ?? ERROR_CODES.INTERNAL_ERROR;

  sendError(res, statusCode, message, errorCode, err);
};

export default globalErrorHandler;
