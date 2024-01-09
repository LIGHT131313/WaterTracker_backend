import express from "express";

import userController from "../../controllers/user-controller.js";

import { authenticate, isEmptyBody, upload } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

import { updateUserInfoSchema } from "../../utils/validation/userValidationSchemas.js";

const userRouter = express.Router();

userRouter.get("/current", authenticate, userController.getCurrent);

userRouter.patch(
  "/edit",
  authenticate,
  isEmptyBody,
  validateBody(updateUserInfoSchema),
  userController.updateUserInfo
);

userRouter.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  userController.avatar
);

userRouter.delete(
  "/delete-account",
  authenticate,
  userController.deleteUserAndData
);

export default userRouter;
