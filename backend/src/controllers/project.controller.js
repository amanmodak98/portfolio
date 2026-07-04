import prisma from "../config/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const parseBody = (body) => ({
  title: body.title,
  description: body.description,
  techStack: Array.isArray(body.techStack)
    ? body.techStack
    : (body.techStack || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
  githubUrl: body.githubUrl || null,
  liveUrl: body.liveUrl || null,
  thumbnail: body.thumbnail || null,
  featured: body.featured === true || body.featured === "true",
});

export const listProjects = asyncHandler(async (req, res) => {
  const { search, tech, featured } = req.query;
  const where = {};
  if (search) where.title = { contains: search, mode: "insensitive" };
  if (tech) where.techStack = { has: tech };
  if (featured === "true") where.featured = true;

  const projects = await prisma.project.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  res.json(projects);
});

export const getProject = asyncHandler(async (req, res) => {
  const project = await prisma.project.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!project) throw new ApiError(404, "Project not found");
  res.json(project);
});

export const createProject = asyncHandler(async (req, res) => {
  const project = await prisma.project.create({ data: parseBody(req.body) });
  res.status(201).json(project);
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await prisma.project.update({
    where: { id: Number(req.params.id) },
    data: parseBody(req.body),
  });
  res.json(project);
});

export const deleteProject = asyncHandler(async (req, res) => {
  await prisma.project.delete({ where: { id: Number(req.params.id) } });
  res.status(204).end();
});
