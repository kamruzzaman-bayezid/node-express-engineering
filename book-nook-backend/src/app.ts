import express, { type Request, type Response } from "express";
import config from "./config";
import { initDb } from "./config/db";
import { bookRoutes } from "./modules/books/books.route";
import globalErrorHandler from "./utils/globalErrorHandler";
import { notFoundHandler } from "./utils/notFoundHandler";
import { userRoutes } from "./modules/users/user.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();

// middleware
app.use(express.json());

// health check
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// book route
app.use("/api/v1/books", bookRoutes);

// user route
app.use("/api/v1/users", userRoutes);

// auth route
app.use("/api/v1/auth", authRoutes);

// not found
app.use(notFoundHandler);

// global error handler
app.use(globalErrorHandler);

const bootstrap = async (): Promise<void> => {
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
