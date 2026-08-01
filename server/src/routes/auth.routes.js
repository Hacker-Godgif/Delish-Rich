import { Router } from "express";

import {
  login,
  getCurrentAdmin,
} from "../controllers/auth.controller.js";

import { requireAdmin } from "../middleware/auth.js";

const router = Router();

router.post("/login", login);

router.get("/me", requireAdmin, getCurrentAdmin);

export default router;