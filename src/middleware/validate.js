export function validate(schema) {
  return (req, _res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) {
      const err = new Error("Validation error");
      err.statusCode = 400;
      err.details = error.details.map((d) => d.message);
      return next(err);
    }
    req.body = value;
    next();
  };
}
