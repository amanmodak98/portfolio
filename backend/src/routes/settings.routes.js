import { Router } from "express";
import { getSettings, updateSettings } from "../controllers/settings.controller.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = Router();

router.get("/", getSettings); // public
router.put("/", authMiddleware, requireRole("ADMIN"), updateSettings);

export default router;
