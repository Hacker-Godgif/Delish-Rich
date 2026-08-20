import { Router } from "express";

import {firebaseLogin,getCurrentUser,} from "../controllers/userAuth.controller.js";

import { requireUser } from "../middleware/userAuth.js";

const router = Router();

router.post("/firebase-login",firebaseLogin);

router.get("/me",requireUser,getCurrentUser);

export default router;