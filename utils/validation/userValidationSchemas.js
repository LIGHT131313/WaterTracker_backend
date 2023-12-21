import Joi from "joi";

export const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const subscriptionList = ["starter", "pro", "business"];

export const userRegisterSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().email().pattern(emailRegexp).required(),
  subscription: Joi.string(),
});

export const userLoginSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().email().pattern(emailRegexp).required(),
});

export const userEmailSchema = Joi.object({
  email: Joi.string().email().pattern(emailRegexp).required(),
});

export const userSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});
