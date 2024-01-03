import Joi from "joi";

export const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const gender = ["male", "female"];

export const userRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).max(64).required(),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).max(64).required(),
});

export const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

export const userResetPasswordSchema = Joi.object({
  resetToken: Joi.string().required().messages({
    "string.empty": `Token is required.`,
    "any.required": `Token is required.`,
  }),
  newPassword: Joi.string().min(8).max(64).required().messages({
    "string.min": `Password should have a minimum length of {#limit}.`,
    "string.max": `Password should have a maximum length of {#limit}.`,
    "string.empty": `New password is required.`,
    "any.required": `New password is required.`,
  }),
});
