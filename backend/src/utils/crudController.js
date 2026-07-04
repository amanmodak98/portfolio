import prisma from "../config/prisma.js";
import { asyncHandler } from "./asyncHandler.js";
import { ApiError } from "./ApiError.js";

/**
 * Builds standard CRUD handlers for a Prisma model.
 * @param {string} model  Prisma delegate name, e.g. "skill"
 * @param {(body:object)=>object} map  Maps request body to model data
 * @param {object} [opts]  { orderBy }
 */
export const crudController = (model, map, opts = {}) => {
  const orderBy = opts.orderBy || { id: "desc" };
  const label = model.charAt(0).toUpperCase() + model.slice(1);

  return {
    list: asyncHandler(async (_req, res) => {
      res.json(await prisma[model].findMany({ orderBy }));
    }),
    get: asyncHandler(async (req, res) => {
      const item = await prisma[model].findUnique({
        where: { id: Number(req.params.id) },
      });
      if (!item) throw new ApiError(404, `${label} not found`);
      res.json(item);
    }),
    create: asyncHandler(async (req, res) => {
      res.status(201).json(await prisma[model].create({ data: map(req.body) }));
    }),
    update: asyncHandler(async (req, res) => {
      res.json(
        await prisma[model].update({
          where: { id: Number(req.params.id) },
          data: map(req.body),
        })
      );
    }),
    remove: asyncHandler(async (req, res) => {
      await prisma[model].delete({ where: { id: Number(req.params.id) } });
      res.status(204).end();
    }),
  };
};
