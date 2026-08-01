import Inquiry from "../models/Inquiry.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

// Create Inquiry

export const createInquiry = asyncHandler(async (req, res) => {
  
  
  const inquiry = await Inquiry.create(req.body);

  res.status(201).json(
    new ApiResponse(
      201,
      "Inquiry submitted successfully.",
      inquiry
    )
  );
});

// Get All Inquiries

export const getAllInquiries = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const filter = {};

  if (req.query.status) {
    filter.status = req.query.status;
  }

  if (req.query.search) {
    filter.$or = [
      {
        name: {
          $regex: req.query.search,
          $options: "i",
        },
      },
      {
        email: {
          $regex: req.query.search,
          $options: "i",
        },
      },
    ];
  }

  const total = await Inquiry.countDocuments(filter);

  const inquiries = await Inquiry.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json(
    new ApiResponse(200, "Inquiries fetched successfully", {
      total,
      page,
      totalPages: Math.ceil(total / limit),
      count: inquiries.length,
      inquiries,
    })
  );
});

// Get Inquiry By Id

export const getInquiryById = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id);

  if (!inquiry) {
    throw new ApiError(404, "Inquiry not found");
  }

  res.status(200).json(
    new ApiResponse(
      200,
      "Inquiry fetched successfully",
      inquiry
    )
  );
});

// Update Inquiry Status

export const updateInquiryStatus = asyncHandler(
  async (req, res) => {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      throw new ApiError(404, "Inquiry not found");
    }

    inquiry.status = req.body.status;

    await inquiry.save();

    res.status(200).json(
      new ApiResponse(
        200,
        "Inquiry status updated successfully",
        inquiry
      )
    );
  }
);

// Delete Inquiry

export const deleteInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id);

  if (!inquiry) {
    throw new ApiError(404, "Inquiry not found");
  }

  await inquiry.deleteOne();

  res.status(200).json(
    new ApiResponse(
      200,
      "Inquiry deleted successfully"
    )
  );
});