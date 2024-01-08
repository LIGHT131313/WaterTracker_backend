import express from "express";

import authController from "../controllers/auth-controller.js";
import googleAuthController from "../controllers/googleAuth-controller.js";
import { authenticate, isEmptyBody } from "../middlewares/index.js";

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

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userLoginSchema),
  authController.login
);

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

authRouter.get("/google", googleAuthController.googleAuth);
authRouter.get("/google-redirect", googleAuthController.goodleRedirect);

export default authRouter;
