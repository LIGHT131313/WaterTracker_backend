import express from "express";

import monthlyController from "../controllers/waterRate-controller.js";

import { authenticate } from "../middlewares/index.js";

const monthlyRouter = express.Router();

monthlyRouter.use(authenticate);

monthlyRouter.patch("/", monthlyController.getMonthlyStatistic);

export default monthlyRouter;
