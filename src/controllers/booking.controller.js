import asyncHandler from "express-async-handler";
import Booking from "../models/Booking.js";
import Service from "../models/Service.js";
import { ok } from "../utils/response.js";

export const createBooking = asyncHandler(async (req, res) => {
  const { serviceId, dateTime, note = "" } = req.body;

  if (!dateTime) {
    const err = new Error("dateTime is required");
    err.statusCode = 400;
    throw err;
  }

  const bookingDate = new Date(dateTime);

  if (isNaN(bookingDate.getTime())) {
    const err = new Error("Invalid date format");
    err.statusCode = 400;
    throw err;
  }

  const now = new Date();
  if (bookingDate <= now) {
    const err = new Error("Booking date must be in the future");
    err.statusCode = 400;
    throw err;
  }


  if (bookingDate > oneYearLater) {
    const err = new Error("Booking date is too far in the future");
    err.statusCode = 400;
    throw err;
  }

  const service = await Service.findById(serviceId);
  if (!service || !service.isActive) {
    const err = new Error("Service not found");
    err.statusCode = 404;
    throw err;
  }

  const booking = await Booking.create({
    userId: req.user.userId,
    serviceId,
    dateTime: bookingDate,
    note,
  });

  const populated = await Booking
    .findById(booking._id)
    .populate("serviceId", "title price durationMin");

  return ok(res, { booking: populated }, 201);
});

export const deleteBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const booking = await Booking.findOne({ _id: id, userId: req.user.userId });
  if (!booking) {
    const err = new Error("Booking not found");
    err.statusCode = 404;
    throw err;
  }

  await booking.deleteOne();
  return ok(res, { message: "Booking deleted" });
});
