import { crudController } from "../utils/crudController.js";

export const experienceController = crudController(
  "experience",
  (b) => ({
    company: b.company,
    position: b.position,
    description: b.description,
    startDate: new Date(b.startDate),
    endDate: b.endDate ? new Date(b.endDate) : null,
  }),
  { orderBy: { startDate: "desc" } }
);
