import { createServer } from "http";
import config from "./config";
import type { Req, Res } from "./types/index.type";
import { readData } from "./services/course.service";

const server = createServer((req: Req, res: Res) => {
  const url = req?.url ?? "/";
  const method = req?.method;

  if (url === "/") {
    res.end("This is Home page!!");
  }

  // data
  else if (url.startsWith("/courses")) {
    res.end("This is Course page");
    readData();
  } else {
    res.end("Page is not found!!");
  }
});

server.listen(config.port, () => {
  console.log(`App is running in port ${config.port}`);
});
