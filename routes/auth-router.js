import express from "express";

import authController from "../controllers/auth-controller.js";

import { authenticate, isEmptyBody, upload } from "../middlewares/index.js";

import { validateBody } from "../decorators/index.js";

import {
  userRegisterSchema,
  userLoginSchema,
  userEmailSchema,
  userResetPasswordSchema,
} from "../utils/validation/authValidationSchemas.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(userRegisterSchema),
  authController.register
);

// authRouter.get("/verify/:verificationToken", authController.verify);

// authRouter.post(
//   "/verify",
//   isEmptyBody,
//   validateBody(userEmailSchema),
//   authController.resendVerify
// );

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userLoginSchema),
  authController.login
);

// authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.post(
  "/request-pass",
  isEmptyBody,
  validateBody(userEmailSchema),
  authController.requestPasswordReset
);

authRouter.post(
  "/reset-pass",
  isEmptyBody,
  validateBody(userResetPasswordSchema),
  authController.resetPassword
);

// authRouter.patch(
//   "/subscription",
//   authenticate,
//   isEmptyBody,
//   validateBody(userSubscriptionSchema),
//   authController.subscription
// );

// authRouter.patch(
//   "/avatars",
//   authenticate,
//   upload.single("avatar"),
//   authController.avatar
// );

export default authRouter;
