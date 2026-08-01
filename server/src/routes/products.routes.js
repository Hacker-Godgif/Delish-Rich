import { Router } from "express";
import { requireAdmin } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import {createProduct,getProducts,getProductBySlug,getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import {
  createProductValidation,
  updateProductValidation,
} from "../validators/product.validator.js";

import { validate } from "../middleware/validate.js";

const router = Router();

router.get("/", getProducts);
router.get("/id/:id", getProductById);



router.get("/:slug", getProductBySlug);

router.post(
  "/",
  requireAdmin,
  upload.array("images", 5),
  createProductValidation,
  validate,
  createProduct
);

router.put(
  "/:id",
  requireAdmin,
  upload.array("images", 5),
  updateProductValidation,
  validate,
  updateProduct
);

router.delete(
  "/:id",
  requireAdmin,
  deleteProduct
);

export default router;