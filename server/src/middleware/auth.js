import jwt from "jsonwebtoken";

import Admin from "../models/Admin.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export const requireAdmin = asyncHandler(
  async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      throw new ApiError(
        401,
        "Unauthorized: token missing"
      );
    }

    const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
  );
  
} catch {
    throw new ApiError(401, "Invalid or expired token");
  }

    const admin = await Admin.findById(
      decoded.id
    ).select("-password");

    if (!admin) {
      throw new ApiError(
        401,
        "Unauthorized: admin not found"
      );
    }

    req.admin = admin;

    next();
  }
);