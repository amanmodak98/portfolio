import { Router } from "express";
import {
  createMessage,
  listMessages,
  updateMessage,
  deleteMessage,
} from "../controllers/message.controller.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = Router();
const admin = [authMiddleware, requireRole("ADMIN")];

router.post("/", createMessage); // public contact form
router.get("/", admin, listMessages);
router.patch("/:id", admin, updateMessage);
router.delete("/:id", admin, deleteMessage);

export default router;
