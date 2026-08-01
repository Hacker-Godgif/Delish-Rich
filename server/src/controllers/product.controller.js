import mongoose from "mongoose";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import cloudinary from "../config/cloudinary.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";


// CREATE PRODUCT

export const createProduct = asyncHandler(async (req, res) => {
  const { category } = req.body;

  if (!mongoose.Types.ObjectId.isValid(category)) {
    throw new ApiError(400, "Invalid category id");
  }

  const existingCategory = await Category.findById(category);

  if (!existingCategory) {
    throw new ApiError(404, "Category not found");
  }

  const images = [];

  if (req.files?.length) {
    for (const file of req.files) {
      const image = await uploadToCloudinary(file.path);

      images.push({
        url: image.url,
        public_id: image.public_id,
      });
    }
  }

  const product = await Product.create({
    ...req.body,
    images,
  });

  res.status(201).json(
    new ApiResponse(
      201,
      "Product created successfully",
      product
    )
  );
});


// GET ALL PRODUCTS

export const getProducts = asyncHandler(async (req, res) => {
  const { category, featured } = req.query;

  const page = Number(req.query.page) || 1;

  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const query = {};

  if (req.query.search) {
  query.$or = [
    {
      name: {
        $regex: req.query.search,
        $options: "i",
      },
    },
    {
      description: {
        $regex: req.query.search,
        $options: "i",
      },
    },
  ];
}

  if (category) {
    query.category = category;
  }

  if (featured) {
    query.featured = featured === "true";
  }

  if (req.query.search) {
  query.$or = [
    {
      name: {
        $regex: req.query.search,
        $options: "i",
      },
    },
    {
      description: {
        $regex: req.query.search,
        $options: "i",
      },
    },
  ];
  }

  const total = await Product.countDocuments(query);

  const products = await Product.find(query)
    .populate("category")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

 return res.status(200).json(
  new ApiResponse(200, "Products fetched successfully", {
    products,
    total,
    count: products.length,
    page,
    totalPages: Math.ceil(total / limit),
  })
);
});


// GET PRODUCT BY SLUG

export const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    slug: req.params.slug,
  }).populate("category");

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res.status(200).json(
    new ApiResponse(
      200,
      "Product fetched successfully",
      product
    )
  );
});

export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid product id");
  }

  const product = await Product.findById(id).populate(
    "category"
  );

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res.status(200).json(
    new ApiResponse(
      200,
      "Product fetched successfully",
      product
    )
  );
});


// UPDATE PRODUCT

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const { category, removedImages } = req.body;

  // validate category

  if (category) {
    if (!mongoose.Types.ObjectId.isValid(category)) {
      throw new ApiError(400, "Invalid category id");
    }

    const existingCategory = await Category.findById(category);

    if (!existingCategory) {
      throw new ApiError(404, "Category not found");
    }
  }

  // delete selected images

  if (removedImages) {
    const imagesToDelete = JSON.parse(removedImages);

    for (const publicId of imagesToDelete) {
      await cloudinary.uploader.destroy(publicId);
    }

    product.images = product.images.filter(
      (image) =>
        !imagesToDelete.includes(image.public_id)
    );
  }

  // upload new images

  if (req.files?.length) {
    for (const file of req.files) {
      const uploaded = await uploadToCloudinary(file.path);

      product.images.push({
        url: uploaded.url,
        public_id: uploaded.public_id,
      });
    }
  }

  // update fields

  product.name = req.body.name ?? product.name;

  product.slug = req.body.slug ?? product.slug;

  product.description =
    req.body.description ?? product.description;

  product.price = req.body.price ?? product.price;

  product.category =
    req.body.category ?? product.category;

  if (req.body.featured !== undefined) {
    product.featured = req.body.featured;
  }

  await product.save();

  await product.populate("category");

  res.status(200).json(
    new ApiResponse(
      200,
      "Product updated successfully",
      product
    )
  );
});

// DELETE PRODUCT

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  for (const image of product.images) {
    await cloudinary.uploader.destroy(image.public_id);
  }

  await product.deleteOne();

  res.status(200).json(
    new ApiResponse(
      200,
      "Product deleted successfully"
    )
  );
});