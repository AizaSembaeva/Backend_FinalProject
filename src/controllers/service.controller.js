import asyncHandler from "express-async-handler";
import Service from "../models/Service.js";
import { ok } from "../utils/response.js";

export const createService = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);
  return ok(res, { service }, 201);
});

export const getServices = asyncHandler(async (_req, res) => {
  const services = await Service.find({ isActive: true }).sort({ createdAt: -1 });
  return ok(res, { services });
});

export const getServiceById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const service = await Service.findById(id);

  if (!service || !service.isActive) {
    const err = new Error("Service not found");
    err.statusCode = 404;
    throw err;
  }

  return ok(res, { service });
});

export const updateService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const service = await Service.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!service) {
    const err = new Error("Service not found");
    err.statusCode = 404;
    throw err;
  }
  return ok(res, { service });
});

export const deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const service = await Service.findByIdAndDelete(id);
  if (!service) {
    const err = new Error("Service not found");
    err.statusCode = 404;
    throw err;
  }
  return ok(res, { message: "Service deleted" });
});
