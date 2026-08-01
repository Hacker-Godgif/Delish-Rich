import mongoose from "mongoose";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const createCategory = asyncHandler(
  async (req, res) => {
    const category = await Category.create(req.body);
    res.status(201).json(
      new ApiResponse(
        201,
        "Category created successfully",
        category
      )
    );
  }
);

export const getCategories = asyncHandler(
  async (req, res) => {
    const categories = await Category.find().sort({
      order: 1,
      name: 1,
    });
    res.status(200).json(
      new ApiResponse(
        200,
        "Categories fetched successfully",
        {
          count: categories.length,
          categories,
        }
      )
    );
  }
);

export const getCategoryById = asyncHandler(
  async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid category id");
    }
    const category = await Category.findById(id);
    if (!category) {
      throw new ApiError(
        404,
        "Category not found"
      );
    }
    res.status(200).json(
      new ApiResponse(
        200,
        "Category fetched successfully",
        category
      )
    );
  }
);

export const updateCategory = asyncHandler(
  async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      throw new ApiError(400, "Invalid category id");
  }
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!category) {
      throw new ApiError(
        404,
        "Category not found"
      );
    }

    res.status(200).json(
      new ApiResponse(
        200,
        "Category updated successfully",
        category
      )
    );
  }
);

export const deleteCategory = asyncHandler(
  async (req, res) => {
    const category = await Category.findById(
      req.params.id
    );
    if (!category) {
      throw new ApiError(
        404,
        "Category not found"
      );
    }
    const productCount =
      await Product.countDocuments({
        category: req.params.id,
      });
    if (productCount > 0) {
      throw new ApiError(
        400,
        "Cannot delete category because it is assigned to existing products."
      );
    }
    await category.deleteOne();
    res.status(200).json(
      new ApiResponse(
        200,
        "Category deleted successfully"
      )
    );
  }
);