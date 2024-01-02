import express from "express";

import todayControllers from "../controllers/today-constroller.js";

import { todayDateSchema } from "../utils/validation/dateValidationSchemas.js";

import { validateQuery } from "../decorators/index.js";

import { isEmptyQuery, authenticate } from "../middlewares/index.js";

const todayRouter = express.Router();

todayRouter.use(authenticate);

todayRouter.get(
  "/",
  isEmptyQuery,
  validateQuery(todayDateSchema),
  todayControllers.getDayliStatistic
);

export default todayRouter;
