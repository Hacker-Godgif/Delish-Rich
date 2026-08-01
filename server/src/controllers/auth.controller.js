import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Admin from "../models/Admin.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });

  if (!admin) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isMatch = await bcrypt.compare(
    password,
    admin.password
  );

  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = jwt.sign(
    { id: admin._id , role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Login successful",
      {
        token,
        admin: {
          id: admin._id,
          username: admin.username,
        },
      }
    )
  );
});

export const getCurrentAdmin = asyncHandler(
  async (req, res) => {
    return res.status(200).json(
      new ApiResponse(
        200,
        "Admin fetched successfully",
        req.admin
      )
    );
  }
);