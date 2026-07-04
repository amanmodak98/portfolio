import { crudController } from "../utils/crudController.js";

export const certificateController = crudController(
  "certificate",
  (b) => ({
    title: b.title,
    issuer: b.issuer,
    issueDate: new Date(b.issueDate),
    imageUrl: b.imageUrl || null,
    verifyUrl: b.verifyUrl || null,
  }),
  { orderBy: { issueDate: "desc" } }
);
