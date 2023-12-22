import express from "express";

import userController from "../../controllers/user-controller.js";

import { authenticate, isEmptyBody, upload } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

const userRouter = express.Router();

userRouter.get("/current", authenticate, userController.getCurrent);

userRouter.patch("/edit", authenticate, userController.updateUserInfo);

userRouter.post(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  userController.avatar
);

export default userRouter;
