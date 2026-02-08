export function requireAdmin(req, _res, next) {
  if (!req.user?.isAdmin) {
    const err = new Error("Forbidden (admin only)");
    err.statusCode = 403;
    return next(err);
  }
  next();
}
