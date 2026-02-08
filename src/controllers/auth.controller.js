import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { signToken } from "../utils/jwt.js";
import { ok } from "../utils/response.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone = "" } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    const err = new Error("Email already registered");
    err.statusCode = 409;
    throw err;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, passwordHash, phone });

  const token = signToken({ userId: user._id.toString(), isAdmin: user.isAdmin });

  return ok(res, {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
    },
  }, 201);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error("Invalid email or password");
    err.statusCode = 401;
    throw err;
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    const err = new Error("Invalid email or password");
    err.statusCode = 401;
    throw err;
  }

  const token = signToken({ userId: user._id.toString(), isAdmin: user.isAdmin });

  return ok(res, {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
    },
  });
});
