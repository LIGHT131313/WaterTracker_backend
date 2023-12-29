import express from "express";

import todayControllers from "../controllers/today-constroller.js";

import { todayDateSchema } from "../utils/validation/dateValidationSchemas.js";

import { validateBody } from "../decorators/index.js";

import { isEmptyBody, authenticate } from "../middlewares/index.js";

const todayRouter = express.Router();

todayRouter.use(authenticate);

todayRouter.post(
  "/",
  isEmptyBody,
  validateBody(todayDateSchema),
  todayControllers.getDayliStatistic
);

export default todayRouter;
