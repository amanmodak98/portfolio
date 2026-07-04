import { crudController } from "../utils/crudController.js";

export const educationController = crudController(
  "education",
  (b) => ({
    institution: b.institution,
    degree: b.degree,
    cgpa: b.cgpa || null,
    startYear: Number(b.startYear),
    endYear: b.endYear ? Number(b.endYear) : null,
  }),
  { orderBy: { startYear: "desc" } }
);
