import express from "express";

import todayControllers from "../controllers/today-constroller.js";

import { authenticate } from "../middlewares/index.js";

const todayRouter = express.Router();

todayRouter.use(authenticate);

todayRouter.patch("/", todayControllers.getDayliStatistic);

export default todayRouter;
