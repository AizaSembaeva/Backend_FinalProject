import Joi from "joi";

export const createBookingSchema = Joi.object({
  serviceId: Joi.string().hex().length(24).required(),
  dateTime: Joi.date().iso().required(),
  note: Joi.string().allow("").max(1000),
});
