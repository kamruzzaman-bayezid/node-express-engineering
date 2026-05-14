import express, { type Request, type Response } from "express";
import config from "./config";
import { initDb } from "./config/db";
import { bookRoutes } from "./modules/books/books.route";
import globalErrorHandler from "./utils/globalErrorHandler";
import { notFoundHandler } from "./utils/notFoundHandler";

const app = express();

// middleware
app.use(express.json());

// initialize database
initDb();

app.get("/api/v1", (req: Request, res: Response) => {
  res.send("Online Book Store Management System!");
});

app.use("/api/v1", bookRoutes);

// not found
app.use(notFoundHandler);

// global error handler
app.use(globalErrorHandler);

const bootstrap = async () => {
  try {
    await initDb();
    app.listen(config.port, () => {
      console.log(`Book store app listening on port ${config.port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

bootstrap();
