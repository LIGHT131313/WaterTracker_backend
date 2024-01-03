import express from "express";

import monthlyControllers from "../controllers/month-controller.js";

import { authenticate, isEmptyQuery } from "../middlewares/index.js";

import { validateQuery } from "../decorators/index.js";
import { monthAddSchema } from "../utils/validation/monthValidationSchemas.js";

const monthlyRouter = express.Router();

monthlyRouter.use(authenticate);

monthlyRouter.get(
  "/",
  isEmptyQuery,
  validateQuery(monthAddSchema),
  monthlyControllers.getMonthlyStatistic
);

export default monthlyRouter;
