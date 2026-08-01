import { Router } from 'express';
import { requireAdmin } from '../middleware/auth.js';
import { createCategory, getCategoryById, getCategories,updateCategory,deleteCategory } from "../controllers/category.controller.js";
import { categoryValidation } from "../validators/category.validator.js";
import { validate } from "../middleware/validate.js";

const r = Router();

r.get("/", getCategories);
r.get("/:id", getCategoryById);
r.post("/",requireAdmin,categoryValidation,validate,createCategory);
r.put("/:id",requireAdmin,categoryValidation,validate,updateCategory);
r.delete("/:id",requireAdmin, deleteCategory);

export default r;
