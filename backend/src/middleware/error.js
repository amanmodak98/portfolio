import { ApiError } from "../utils/ApiError.js";

export const notFound = (_req, res) => {
  res.status(404).json({ message: "Route not found" });
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, _req, res, _next) => {
  const status = err instanceof ApiError ? err.statusCode : 500;
  const message = err.message || "Internal server error";
  if (status === 500) console.error(err);
  res.status(status).json({ message });
};
