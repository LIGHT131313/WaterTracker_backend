import Joi from "joi";

export const waterAddSchema = Joi.object({
  waterVolume: Joi.number().required().messages({
    "any.required": `"waterVolume" missing required name field`,
    "string.base": `"waterVolume" must be number`,
  }),
  date: Joi.date().required(),
});
