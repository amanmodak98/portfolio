import prisma from "../config/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Public: record a page visit (fire-and-forget from the client).
export const trackVisit = asyncHandler(async (req, res) => {
  const { visitorId, page, device, browser, country } = req.body;
  if (!visitorId || !page) return res.status(204).end();

  await prisma.visitorAnalytics.create({
    data: {
      visitorId,
      page,
      device: device || null,
      browser: browser || null,
      country: country || null,
    },
  });
  res.status(204).end();
});

// Admin: aggregated analytics for the dashboard.
export const getAnalytics = asyncHandler(async (_req, res) => {
  const [total, uniqueVisitors, byPage] = await Promise.all([
    prisma.visitorAnalytics.count(),
    prisma.visitorAnalytics.findMany({
      distinct: ["visitorId"],
      select: { visitorId: true },
    }),
    prisma.visitorAnalytics.groupBy({
      by: ["page"],
      _count: { page: true },
      orderBy: { _count: { page: "desc" } },
      take: 10,
    }),
  ]);

  res.json({
    totalVisits: total,
    uniqueVisitors: uniqueVisitors.length,
    topPages: byPage.map((p) => ({ page: p.page, visits: p._count.page })),
  });
});
