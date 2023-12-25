import express from "express";

import monthlyControllers from "../controllers/month-controller.js";

import { authenticate } from "../middlewares/index.js";

const monthlyRouter = express.Router();

monthlyRouter.use(authenticate);

monthlyRouter.patch("/", monthlyControllers.getMonthlyStatistic);

export default monthlyRouter;
