import express from "express";

import waterController from "../controllers/water-controller.js";

import { isEmptyBody, authenticate } from "../middlewares/index.js";

const waterRouter = express.Router();

waterRouter.use(authenticate);

waterRouter.post("/", isEmptyBody, waterController.addWaterValue);

waterRouter.patch("/:id", isEmptyBody, waterController.updateWaterValueByID);

waterRouter.delete("/:id", isEmptyBody, waterController.deleteteWaterValueByID);

export default waterRouter;
