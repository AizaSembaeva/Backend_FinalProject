import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import { ok } from "../utils/response.js";

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.userId).select("-passwordHash");
  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }

  const bookings = await Booking.find({ userId: user._id, status: "booked" })
    .sort({ dateTime: -1 })
    .populate("serviceId", "title price durationMin");

  return ok(res, { user, bookings });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.userId);
  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }

  const { name, phone } = req.body;

  if (typeof name !== "undefined") user.name = name;
  if (typeof phone !== "undefined") user.phone = phone;

  await user.save();

  const safeUser = await User.findById(user._id).select("-passwordHash");
  return ok(res, { user: safeUser });
});
