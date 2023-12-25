import express from "express";

import monthlyController from "../controllers/waterRate-controller.js";

import { isEmptyBody, authenticate } from "../middlewares/index.js";

const monthlyRouter = express.Router();

monthlyRouter.use(authenticate);

monthlyRouter.patch("/", isEmptyBody, monthlyController.getMonthlyStatistic);

export default monthlyRouter;
