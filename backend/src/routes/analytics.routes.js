import { Router } from "express";
import { trackVisit, getAnalytics } from "../controllers/analytics.controller.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = Router();

router.post("/track", trackVisit); // public
router.get("/", authMiddleware, requireRole("ADMIN"), getAnalytics);

export default router;
