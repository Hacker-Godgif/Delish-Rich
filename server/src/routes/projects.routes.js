import { Router } from "express";
import upload from "../middleware/upload.js";

import {
  createProject,
  getProjects,
  getProjectBySlug,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";

import { requireAdmin } from "../middleware/auth.js";

const router = Router();

//Public
router.get("/", getProjects);
router.get("/id/:id", getProjectById);
router.get("/:slug", getProjectBySlug);
 
//Admin
router.post("/",requireAdmin,createProject);
router.post("/",requireAdmin,upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),createProject
);
router.put("/:id",requireAdmin,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  updateProject
);
router.delete("/:id",requireAdmin,deleteProject);

export default router;