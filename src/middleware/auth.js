import { verifyToken } from "../utils/jwt.js";

export function requireAuth(req, _res, next) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");
  if (type !== "Bearer" || !token) {
    const err = new Error("Unauthorized");
    err.statusCode = 401;
    return next(err);
  }

  try {
    const payload = verifyToken(token);
    req.user = { userId: payload.userId, isAdmin: payload.isAdmin };
    next();
  } catch (_e) {
    const err = new Error("Invalid or expired token");
    err.statusCode = 401;
    next(err);
  }
}
