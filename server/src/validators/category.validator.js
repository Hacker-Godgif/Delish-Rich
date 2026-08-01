import { body } from "express-validator";

export const categoryValidation = [

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required"),

  body("slug")
  .trim()
  .toLowerCase()
  .notEmpty()
  .withMessage("Slug is required")
  .isSlug()
  .withMessage("Slug is invalid"),

  body("order")
    .optional()
    .isNumeric()
    .withMessage("Order must be a number"),
];