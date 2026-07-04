import prisma from "../config/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { slugify } from "../utils/slugify.js";

const parseBody = (body) => ({
  title: body.title,
  content: body.content,
  coverImage: body.coverImage || null,
  category: body.category || null,
  tags: Array.isArray(body.tags)
    ? body.tags
    : (body.tags || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
  status: body.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
});

// Public list: only PUBLISHED. Admin list (?all=true) returns everything.
export const listBlogs = asyncHandler(async (req, res) => {
  const { tag, category, all } = req.query;
  const where = {};
  if (all !== "true") where.status = "PUBLISHED";
  if (tag) where.tags = { has: tag };
  if (category) where.category = category;

  const blogs = await prisma.blog.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  res.json(blogs);
});

export const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await prisma.blog.findUnique({ where: { slug: req.params.slug } });
  if (!blog) throw new ApiError(404, "Blog not found");
  res.json(blog);
});

export const getBlog = asyncHandler(async (req, res) => {
  const blog = await prisma.blog.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!blog) throw new ApiError(404, "Blog not found");
  res.json(blog);
});

const uniqueSlug = async (title, excludeId) => {
  const base = slugify(title);
  let slug = base;
  let n = 1;
  // Ensure uniqueness against other rows.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await prisma.blog.findUnique({ where: { slug } });
    if (!existing || existing.id === excludeId) return slug;
    slug = `${base}-${n++}`;
  }
};

export const createBlog = asyncHandler(async (req, res) => {
  const data = parseBody(req.body);
  data.slug = await uniqueSlug(data.title);
  res.status(201).json(await prisma.blog.create({ data }));
});

export const updateBlog = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const data = parseBody(req.body);
  data.slug = await uniqueSlug(data.title, id);
  res.json(await prisma.blog.update({ where: { id }, data }));
});

export const deleteBlog = asyncHandler(async (req, res) => {
  await prisma.blog.delete({ where: { id: Number(req.params.id) } });
  res.status(204).end();
});
