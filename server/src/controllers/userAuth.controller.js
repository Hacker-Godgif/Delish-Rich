import jwt from "jsonwebtoken";

import { adminAuth } from "../config/firebase.js";
import User from "../models/User.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";


// Firebase user → MongoDB user
export const firebaseLogin = asyncHandler(
  async (req, res) => {
    const { firebaseToken } = req.body;

    if (!firebaseToken) {
      throw new ApiError(
        400,
        "Firebase token is required"
      );
    }

    const decodedToken =
      await adminAuth.verifyIdToken(
        firebaseToken
      );

    const {
      uid,
      email,
      name,
      picture,
      firebase,
    } = decodedToken;

    if (!email) {
      throw new ApiError(
        400,
        "Firebase account does not contain an email"
      );
    }

    let user = await User.findOne({
      firebaseUid: uid,
    });

    if (!user) {
      user = await User.findOne({
        email,
      });
    }

    if (!user) {
      const provider =
        firebase?.sign_in_provider ===
        "google.com"
          ? "google"
          : "password";

      user = await User.create({
        name:
          name ||
          email.split("@")[0],

        email,

        firebaseUid: uid,

        avatar: picture || "",

        provider,
      });
    }

    if (user.isBlocked) {
      throw new ApiError(
        403,
        "Your account has been blocked"
      );
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: "user",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Authentication successful",
        {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            provider: user.provider,
          },
        }
      )
    );
  }
);


// Current logged-in user
export const getCurrentUser =
  asyncHandler(async (req, res) => {
    const user = await User.findById(
      req.user.id
    );

    if (!user) {
      throw new ApiError(
        404,
        "User not found"
      );
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        "Current user fetched successfully",
        user
      )
    );
  });