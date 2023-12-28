import Joi from "joi";

export const monthAddSchema = Joi.object({
  year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required(),

  month: Joi.number().integer().min(1).max(12).required(),
});
