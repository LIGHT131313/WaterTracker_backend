import Joi from "joi";

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" missing required name field`,
    "string.base": `"name" must be text`,
  }),
  email: Joi.string().required().messages({
    "string.base": `"email" must be text`,
  }),
  phone: Joi.string().required().messages({
    "string.base": `"phone" must be text`,
  }),
  favorite: Joi.boolean(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().messages({
    "string.base": `"name" must be text`,
  }),
  email: Joi.string().messages({
    "string.base": `"email" must be text`,
  }),
  phone: Joi.string().messages({
    "string.base": `"phone" must be text`,
  }),
  favorite: Joi.boolean(),
});

export const contactFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
