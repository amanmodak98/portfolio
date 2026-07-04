import { Router } from "express";
import {
  listProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = Router();
const admin = [authMiddleware, requireRole("ADMIN")];

router.get("/", listProjects);
router.get("/:id", getProject);
router.post("/", admin, createProject);
router.put("/:id", admin, updateProject);
router.delete("/:id", admin, deleteProject);

export default router;
