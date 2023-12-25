import express from "express";

import { validateBody } from "../decorators/index.js";

import { userWaterRateSchema } from "../utils/validation/userValidationSchemas.js";

import { isEmptyBody, isValidId, authenticate } from "../middlewares/index.js";

import waterRateControlles from "../controllers/waterRate-controller.js";

const waterRateRouter = express.Router();

waterRateRouter.use(authenticate);

waterRateRouter.post(
  "/",
  isEmptyBody,
  validateBody(userWaterRateSchema),
  waterRateControlles.updateWaterRate
);

export default waterRateRouter;
