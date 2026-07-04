import { Router } from "express";
import { getOverview } from "../controllers/dashboard.controller.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = Router();

router.get("/", authMiddleware, requireRole("ADMIN"), getOverview);

export default router;
