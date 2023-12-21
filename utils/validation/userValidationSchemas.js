import Joi from "joi";

export const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const gender = ["male", "female"];

export const userSignUpSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).max(64).required(),
});

export const userSignInSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).max(64).required(),
});

export const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

export const userWaterRateSchema = Joi.object({
  waterRate: Joi.number().min(0).max(15000).required(),
});

export const updateUserInfoSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailRegexp),
  outdatedPassword: Joi.string().min(8).max(64),
  newPassword: Joi.string().min(8).max(64),
  repeatNewPassword: Joi.string().min(8).max(64),
  gender: Joi.string().valid(...gender),
});
