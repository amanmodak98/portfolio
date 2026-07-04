import prisma from "../config/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const DEFAULTS = { id: 1 };

// Public: returns the singleton settings row, creating it on first access.
export const getSettings = asyncHandler(async (_req, res) => {
  let settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  if (!settings) settings = await prisma.siteSettings.create({ data: DEFAULTS });
  res.json(settings);
});

// Admin: upserts the singleton settings row.
export const updateSettings = asyncHandler(async (req, res) => {
  const data = {
    fullName: req.body.fullName,
    role: req.body.role,
    tagline: req.body.tagline,
    bio: req.body.bio,
    location: req.body.location || null,
    email: req.body.email,
    githubUrl: req.body.githubUrl || null,
    linkedinUrl: req.body.linkedinUrl || null,
    twitterUrl: req.body.twitterUrl || null,
    resumeUrl: req.body.resumeUrl || null,
  };

  const settings = await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  });
  res.json(settings);
});
