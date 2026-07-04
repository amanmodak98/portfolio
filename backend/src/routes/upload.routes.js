import { Router } from "express";
import { uploadFile } from "../controllers/upload.controller.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  requireRole("ADMIN"),
  upload.single("file"),
  uploadFile
);

export default router;
