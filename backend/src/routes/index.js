import { Router } from "express";

import authRoutes from "./auth.routes.js";
import projectRoutes from "./project.routes.js";
import blogRoutes from "./blog.routes.js";
import messageRoutes from "./message.routes.js";
import analyticsRoutes from "./analytics.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import uploadRoutes from "./upload.routes.js";
import settingsRoutes from "./settings.routes.js";
import { crudRoutes } from "./crudRoutes.js";

import { skillController } from "../controllers/skill.controller.js";
import { experienceController } from "../controllers/experience.controller.js";
import { educationController } from "../controllers/education.controller.js";
import { certificateController } from "../controllers/certificate.controller.js";

const router = Router();

router.get("/health", (_req, res) => res.json({ status: "ok" }));

router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/blogs", blogRoutes);
router.use("/messages", messageRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/upload", uploadRoutes);
router.use("/settings", settingsRoutes);

router.use("/skills", crudRoutes(skillController));
router.use("/experience", crudRoutes(experienceController));
router.use("/education", crudRoutes(educationController));
router.use("/certificates", crudRoutes(certificateController));

export default router;
