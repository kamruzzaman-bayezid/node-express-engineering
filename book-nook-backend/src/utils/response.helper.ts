import type { Response } from "express";

export const sendSuccess = <T>(
  res: Response,
  message: string,
  data: T,
  statusCode: number = 200,
) => {
  res.status(statusCode).json({
    success: true,
    message: message,
    data: data,
  });
};

export const sendCreated = <T>(res: Response, message: string, data: T) => {
  sendSuccess(res, message, data, 201);
};

export const sendError = (
  res: Response,
  statusCode: number = 500,
  message: string,
  errorCode = "INTERNAL_ERROR",
  err?: unknown,
) => {
  const isDev = process.env.NODE_ENV === "development";
  res.status(statusCode).json({
    success: false,
    message,
    error: {
      code: errorCode,
      ...(isDev &&
        err instanceof Error && {
          errorDetails: err?.message,
          stack: err?.stack,
        }),
    },
  });
};
