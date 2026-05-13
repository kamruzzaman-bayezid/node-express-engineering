import { HttpStatus, type Req, type Res } from "../types/index.type";
import { sendResponse } from "../utils/sendResponse";

export const readData = async (req: Req, res: Res) => {
  try {
    const result = await readData(req, res);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        success: true,
        message: "Data retrieved successfully!",
        data: result,
      }),
    );

//     sendResponse(res, HttpStatus.OK, "Data retrieved successfully!", result);
  } catch (error) {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        success: false,
        message:
          error instanceof Error ? error?.message : "Something is wrong!",
      }),
    );
  }
};
