import { crudController } from "../utils/crudController.js";

export const skillController = crudController(
  "skill",
  (b) => ({
    name: b.name,
    category: b.category,
    percentage: Number(b.percentage) || 0,
  }),
  { orderBy: { category: "asc" } }
);
