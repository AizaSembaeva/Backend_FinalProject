import Joi from "joi";

export const createServiceSchema = Joi.object({
  title: Joi.string().min(2).max(120).required(),
  description: Joi.string().allow("").max(2000),
  price: Joi.number().min(0).required(),
  durationMin: Joi.number().integer().min(5).max(600).required(),
  isActive: Joi.boolean(),
});

export const updateServiceSchema = Joi.object({
  title: Joi.string().min(2).max(120),
  description: Joi.string().allow("").max(2000),
  price: Joi.number().min(0),
  durationMin: Joi.number().integer().min(5).max(600),
  isActive: Joi.boolean(),
}).min(1);
