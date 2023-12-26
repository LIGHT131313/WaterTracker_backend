import Joi from "joi";

export const todayDateSchema = Joi.object({
  date: Joi.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": '"date" must be in the format "yyyy-mm-dd"',
    }),
});
