import express from "express";

import monthlyControllers from "../controllers/month-controller.js";

import { authenticate } from "../middlewares/index.js";
import { todayDateSchema } from "../utils/validation/dateValidationSchemas.js";
import { validateBody } from "../decorators/index.js";
// import { monthAddSchema } from "../utils/validation/monthValidationSchemas.js"; - для конкретного місяця

const monthlyRouter = express.Router();

monthlyRouter.use(authenticate);

monthlyRouter.get(
  "/",
  validateBody(todayDateSchema),
  //   validateBody(monthAddSchema), - для конкретного місяця
  monthlyControllers.getMonthlyStatistic
);

export default monthlyRouter;
