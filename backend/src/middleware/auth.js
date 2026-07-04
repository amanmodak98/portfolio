import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

// Verifies the Bearer JWT and attaches the decoded payload to req.user.
export const authMiddleware = (req, _res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return next(new ApiError(401, "Authentication required"));

  try {
    req.user = jwt.verify(token, env.jwtSecret);
    next();
  } catch {
    next(new ApiError(401, "Invalid or expired token"));
  }
};

// Restricts a route to a given role (defaults to ADMIN).
export const requireRole =
  (role = "ADMIN") =>
  (req, _res, next) => {
    if (!req.user || req.user.role !== role) {
      return next(new ApiError(403, "Insufficient permissions"));
    }
    next();
  };
