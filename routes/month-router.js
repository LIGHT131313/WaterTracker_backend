import express from "express";

import monthlyControllers from "../controllers/month-controller.js";

import { authenticate, isEmptyBody } from "../middlewares/index.js";

import { validateBody } from "../decorators/index.js";
import { monthAddSchema } from "../utils/validation/monthValidationSchemas.js";

const monthlyRouter = express.Router();

monthlyRouter.use(authenticate);

monthlyRouter.post(
  "/",
  isEmptyBody,
  validateBody(monthAddSchema),
  monthlyControllers.getMonthlyStatistic
);

export default monthlyRouter;
