import express from "express";

import waterController from "../controllers/water-controller.js";

import { validateBody } from "../decorators/index.js";

import { isEmptyBody, isValidId, authenticate } from "../middlewares/index.js";

import {
  waterAddSchema,
  waterUpdateSchema,
} from "../utils/validation/waterValidationSchemas.js";

const waterRouter = express.Router();

waterRouter.use(authenticate);

waterRouter.post(
  "/",
  isEmptyBody,
  validateBody(waterAddSchema),
  waterController.addWaterValue
);

waterRouter.patch(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(waterUpdateSchema),
  waterController.updateWaterValueByID
);

waterRouter.get("/:id", isValidId, waterController.getWaterValueByID);

waterRouter.delete("/:id", isValidId, waterController.deleteteWaterValueByID);

export default waterRouter;
