import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
};

export function assertEnv() {
  const missing = [];
  if (!env.mongodbUri) missing.push("MONGODB_URI");
  if (!env.jwtSecret) missing.push("JWT_SECRET");

  if (missing.length) {
    const msg = `Missing required env vars: ${missing.join(", ")}. Create a .env file (see .env.example).`;
    const err = new Error(msg);
    err.statusCode = 500;
    throw err;
  }
}
