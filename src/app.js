import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import bookingRoutes from "./routes/booking.routes.js";

import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/error.js";

export function createApp() {
  const app = express();
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));

  app.get("/health", (_req, res) => res.json({ status: "ok" }));

  app.use("/api/auth", authRoutes);
  app.use("/api/users", usersRoutes);
  app.use("/api/service", serviceRoutes);
  app.use("/api/bookings", bookingRoutes);

  app.use(express.static(path.join(__dirname, "../public")));

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
