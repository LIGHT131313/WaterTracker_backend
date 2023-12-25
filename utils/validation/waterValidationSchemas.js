import Joi from "joi";

export const waterAddSchema = Joi.object({
  waterVolume: Joi.number().min(0).max(5000).required().messages({
    "any.required": `"waterVolume" missing required name field`,
    "string.base": `"waterVolume" must be number`,
  }),
  date: Joi.string().isoDate(),
});
//date example - 2023-11-15T14:30 without seconds and miliseconds

export const waterUpdateSchema = Joi.object({
  waterVolume: Joi.number().min(0).max(5000),
  date: Joi.string().isoDate(),
});
