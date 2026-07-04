import { Router } from "express";
import {
  listBlogs,
  getBlog,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = Router();
const admin = [authMiddleware, requireRole("ADMIN")];

router.get("/", listBlogs);
router.get("/slug/:slug", getBlogBySlug);
router.get("/:id", getBlog);
router.post("/", admin, createBlog);
router.put("/:id", admin, updateBlog);
router.delete("/:id", admin, deleteBlog);

export default router;
