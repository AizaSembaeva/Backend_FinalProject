import Joi from "joi";

const phoneSchema = Joi.alternatives().try(
  Joi.string().trim().valid(""),
  Joi.string().trim().pattern(/^\+7\d{10}$/)
).messages({
  "alternatives.match": "Phone must be in format +7XXXXXXXXXX",
  "string.pattern.base": "Phone must be in format +7XXXXXXXXXX",
});

export const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(80).pattern(/^(?!\d+$).+/).messages({
    "string.pattern.base": "Name must not contain only digits"
  }),
  phone: phoneSchema,
}).min(1);


