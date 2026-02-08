import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { connectDb } from "../config/db.js";
import { assertEnv } from "../config/env.js";

async function run() {
  assertEnv();
  await connectDb();

  const name = process.env.ADMIN_NAME || "Admin";
  const email = process.env.ADMIN_EMAIL || "admin@salon.com";
  const password = process.env.ADMIN_PASSWORD || "Admin12345";

  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Admin already exists:", email);
    process.exit(0);
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  await User.create({ name, email, passwordHash, isAdmin: true });

  console.log("Admin created:", { email, password });
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
