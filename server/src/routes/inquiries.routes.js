import { Router } from "express";

import {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
} from "../controllers/inquiry.controller.js";

import { requireAdmin } from "../middleware/auth.js";

import { validate } from "../middleware/validate.js";

import {
  createInquiryValidator,
  updateInquiryStatusValidator,
} from "../validators/inquiry.validator.js";

const router = Router();

// Public

router.post(
  "/",
  createInquiryValidator,
  validate,
  createInquiry
);

// Admin

router.get(
  "/",
  requireAdmin,
  getAllInquiries
);

router.get(
  "/:id",
  requireAdmin,
  getInquiryById
);

router.patch(
  "/:id/status",
  requireAdmin,
  updateInquiryStatusValidator,
  validate,
  updateInquiryStatus
);

router.delete(
  "/:id",
  requireAdmin,
  deleteInquiry
);

export default router;