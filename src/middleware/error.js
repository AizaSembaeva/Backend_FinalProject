export function errorHandler(err, _req, res, _next) {
  const status = err.statusCode || 500;

  const payload = {
    message: err.message || "Server error",
  };

  if (err.details) payload.details = err.details;

  if (err.code === 11000) {
    payload.message = "Duplicate key";
    payload.details = [JSON.stringify(err.keyValue)];
    return res.status(409).json(payload);
  }

  return res.status(status).json(payload);
}
