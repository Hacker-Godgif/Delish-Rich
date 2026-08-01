import { body } from "express-validator";

export const createInquiryValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("phone")
    .optional()
    .trim()
    .isLength({ min: 10 })
    .isMobilePhone()
    .withMessage("Phone number must be at least 10 digits"),

  body("company")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Company name cannot exceed 100 characters"),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Message must be between 10 and 2000 characters"),
];

export const updateInquiryStatusValidator = [
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn([
      "new",
      "contacted",
      "in-progress",
      "resolved",
      "closed",
    ])
    .withMessage("Invalid inquiry status"),
];