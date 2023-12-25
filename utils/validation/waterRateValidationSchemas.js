import Joi from "joi";

export const waterRateAddSchema = Joi.object({
  waterRate: Joi.number().required().messages({
    "any.required": `"waterVolume" missing required name field`,
    "string.base": `"waterVolume" must be number`,
  }),
});
