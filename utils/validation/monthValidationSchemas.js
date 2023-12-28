import Joi from "joi";

// export const monthAddSchema = Joi.object({
//   year: Joi.number()
//     .integer()
//     .min(1900)
//     .max(new Date().getFullYear())
//     .required(),

//   month: Joi.number().integer().min(1).max(12).required(),
// }); - для місячного

export const monthAddSchema = Joi.object({
  startDate: Joi.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": '"date" must be in the format "yyyy-mm-dd"',
    }),
  endDate: Joi.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": '"date" must be in the format "yyyy-mm-dd"',
    }),
});
