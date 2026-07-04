import prisma from "../config/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Admin: high-level counts for the dashboard overview cards.
export const getOverview = asyncHandler(async (_req, res) => {
  const [projects, blogs, messages, unreadMessages, certificates, visitors] =
    await Promise.all([
      prisma.project.count(),
      prisma.blog.count(),
      prisma.message.count(),
      prisma.message.count({ where: { replied: false } }),
      prisma.certificate.count(),
      prisma.visitorAnalytics.count(),
    ]);

  res.json({
    projects,
    blogs,
    messages,
    unreadMessages,
    certificates,
    visitors,
  });
});
