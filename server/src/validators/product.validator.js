import { body } from "express-validator";

export const createProductValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("slug")
  .trim()
  .toLowerCase()
  .notEmpty()
  .withMessage("Slug is required")
  .isSlug()
  .withMessage("Invalid slug"),

  body("description")
    .optional()
    .trim(),

  body("price")
  .isFloat({ min: 0 })
  .withMessage("Price must be greater than or equal to 0"),

  body("category")
  .isMongoId()
  .withMessage("Invalid category id"),

  body("featured")
    .optional()
    .isBoolean()
    .withMessage("Featured must be true or false"),
];

export const updateProductValidation = [
  body("name").optional().trim(),

  body("slug").optional().trim(),

  body("description").optional().trim(),

  body("price")
    .optional()
    .isNumeric()
    .withMessage("Price must be numeric"),

  body("category").optional(),

  body("featured")
    .optional()
    .isBoolean()
    .withMessage("Featured must be true or false"),
];
