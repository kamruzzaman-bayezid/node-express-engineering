import type { Res } from "../types/index.type";

export const sendResponse = (
  res: Res,
  statusCode: number,
  message: string,
  data?: any,
) => {
  const response = {
    statusCode: statusCode,
    success: statusCode >= 200 && statusCode < 300,
    message,
    data: data ?? null,
  };

  res.writeHead(statusCode, { "content-type": "application/json" });
  res.end(JSON.stringify(response, null, 2));
};
