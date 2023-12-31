import express from "express";
import logger from "morgan";
import cors from "cors";
import "dotenv/config";
import { readFile } from "fs/promises";
import swaggerUi from "swagger-ui-express";

import authRouter from "./routes/auth-router.js";
import waterRateRouter from "./routes/waterRate-router.js";
import waterRouter from "./routes/water-router.js";
import userRouter from "./routes/user/user-router.js";
import todayRouter from "./routes/today-router.js";
import monthRouter from "./routes/month-router.js";

const swaggerDocument = JSON.parse(
  await readFile(new URL("./swagger.json", import.meta.url))
);
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/waterrate", waterRateRouter);
app.use("/api/water", waterRouter);
app.use("/api/today", todayRouter);
app.use("/api/month", monthRouter);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({
    message,
  });
});

export default app;
