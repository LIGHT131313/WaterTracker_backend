import express from "express";

import waterRateController from "../controllers/waterRate-controller.js";
import { validateBody } from "../decorators/index.js";
import {
  waterAddSchema,
  waterUpdateSchema,
} from "../utils/validation/waterValidationSchemas.js";
import { isEmptyBody, isValidId, authenticate } from "../middlewares/index.js";

const waterRateRouter = express.Router();

waterRateRouter.use(authenticate);

waterRateRouter.post(
  "/",
  isEmptyBody,
  validateBody(waterAddSchema),
  waterRateController.addWaterRate
);

waterRateRouter.patch(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(waterUpdateSchema),
  waterRateController.updateWaterRate
);

waterRateRouter.delete("/:id", isValidId, waterRateController.deleteWaterRate);

export default waterRateRouter;
