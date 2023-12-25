import express from "express";

import todayController from "../controllers/waterRate-controller.js";

import { authenticate } from "../middlewares/index.js";

const dayliRouter = express.Router();

dayliRouter.use(authenticate);

dayliRouter.patch("/", todayController.getDayliStatistic);

export default dayliRouter;
