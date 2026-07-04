import prisma from "../config/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { sendContactEmail } from "../services/mail.service.js";

// Public: contact form submission.
export const createMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    throw new ApiError(400, "All fields are required");
  }

  const saved = await prisma.message.create({
    data: { name, email, subject, message },
  });

  try {
    await sendContactEmail({ name, email, subject, message });
  } catch (err) {
    console.error("Failed to send contact email:", err.message);
  }

  res.status(201).json({ id: saved.id, ok: true });
});

// Admin: list all messages.
export const listMessages = asyncHandler(async (_req, res) => {
  res.json(await prisma.message.findMany({ orderBy: { createdAt: "desc" } }));
});

// Admin: toggle replied status.
export const updateMessage = asyncHandler(async (req, res) => {
  const message = await prisma.message.update({
    where: { id: Number(req.params.id) },
    data: { replied: req.body.replied === true || req.body.replied === "true" },
  });
  res.json(message);
});

export const deleteMessage = asyncHandler(async (req, res) => {
  await prisma.message.delete({ where: { id: Number(req.params.id) } });
  res.status(204).end();
});
