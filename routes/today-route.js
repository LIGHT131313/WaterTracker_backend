import express from "express";

import todayController from "../controllers/waterRate-controller.js";

import { isEmptyBody, authenticate } from "../middlewares/index.js";

const dayliRouter = express.Router();

dayliRouter.use(authenticate);

dayliRouter.patch("/", isEmptyBody, todayController.getDayliStatistic);

export default dayliRouter;
