import type { IncomingMessage, ServerResponse } from "http";
import { productsController } from "../controllers/product.controller";

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url === "/" && req.method === "GET") {
    res
      .writeHead(200, { "content-type": "text/plain" })
      .end("This is home page");
  } else if (req.url?.startsWith("/products")) {
    productsController(req, res);
  } else {
    res
      .writeHead(404, { "content-type": "text/plain" })
      .end("Page is not found!!");
  }
};
