import express from "express";
import logger from "morgan";
import cors from "cors";
import "dotenv/config";

import authRouter from "./routes/auth-router.js";
import userRouter from "./routes/user/user-router.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/auth", authRouter);
app.use("/user", userRouter);
// app.use("/waterrate", waterrateRouter);
// app.use("/water", waterRouter);
// app.use("/month", monthRouter);
// app.use("/today", todayRouter);

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
