import { Router } from "express";
import { authMiddleware, requireRole } from "../middleware/auth.js";

// Builds a router with public reads and admin-only writes for a crudController.
export const crudRoutes = (controller) => {
  const router = Router();
  const admin = [authMiddleware, requireRole("ADMIN")];

  router.get("/", controller.list);
  router.get("/:id", controller.get);
  router.post("/", admin, controller.create);
  router.put("/:id", admin, controller.update);
  router.delete("/:id", admin, controller.remove);

  return router;
};
