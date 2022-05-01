const { createError } = require("../helpers");

const validation = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(createError(400, "missing required name field"));
      return;
    }
    next();
  };
  return func;
};

module.exports = validation;