import "dotenv/config";
import bcrypt from "bcrypt";

import { connectDb } from "../utils/db.js";
import Admin from "../models/Admin.js";

try {
  await connectDb();

  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  const exists = await Admin.findOne({ username });

  if (exists) {
    console.log("Admin already exists");
    process.exit(0);
  }

  const hash = await bcrypt.hash(password, 10);

  await Admin.create({
    username,
    password: hash,
  });

  console.log("Admin created successfully");

  process.exit(0);
} catch (err) {
  console.error(err);
  process.exit(1);
}