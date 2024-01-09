import Joi from "joi";

export const waterAddSchema = Joi.object({
  waterVolume: Joi.number().min(0).max(5000).required().messages({
    "any.required": `"waterVolume" missing required name field`,
    "string.base": `"waterVolume" must be number`,
  }),
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/)
    .message(
      '"date" must be a ISO 8601 date string with timezone offset -> example 2024-01-09T10:05:50+02:00'
    )
    .required()
    .custom((value, helpers) => {
      const date = new Date(value);
      if (isNaN(date)) {
        return helpers.message({ custom: '"date" is not a valid date' });
      }
      return date;
    }),
});

export const waterUpdateSchema = Joi.object({
  waterVolume: Joi.number().min(0).max(5000),
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/)
    .message(
      '"date" must be a ISO 8601 date string with timezone offset -> example 2024-01-09T10:05:50+02:00'
    )
    .custom((value, helpers) => {
      const date = new Date(value);
      if (isNaN(date)) {
        return helpers.message({ custom: '"date" is not a valid date' });
      }
      return date;
    }),
});
