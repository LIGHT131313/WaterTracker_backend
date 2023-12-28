import express from "express";

import monthlyControllers from "../controllers/month-controller.js";

import { authenticate } from "../middlewares/index.js";

import { validateBody } from "../decorators/index.js";
import { monthAddSchema } from "../utils/validation/monthValidationSchemas.js";

const monthlyRouter = express.Router();

monthlyRouter.use(authenticate);

monthlyRouter.get(
  "/",

  validateBody(monthAddSchema),
  monthlyControllers.getMonthlyStatistic
);

export default monthlyRouter;
