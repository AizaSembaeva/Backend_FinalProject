import Joi from "joi";

const phoneSchema = Joi.alternatives().try(
  Joi.string().trim().valid(""),
  Joi.string().trim().pattern(/^\+7\d{10}$/)
).messages({
  "alternatives.match": "Phone must be in format +7XXXXXXXXXX",
  "string.pattern.base": "Phone must be in format +7XXXXXXXXXX",
});

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(80).pattern(/^(?!\d+$).+/).required()
    .messages({
      "string.pattern.base": "Name must not contain only digits"
    }),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(72).required(),
  phone: phoneSchema,
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(1).max(72).required(),
});

