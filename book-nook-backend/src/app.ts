import express, { type Request, type Response } from "express";
import config from "./config";
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Online Book Store Management System!");
});

app.listen(config.port, () => {
  console.log(`Book store app listening on port ${config.port}`);
});
