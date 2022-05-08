const createError = require("http-errors");

const validation = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(createError(400, "Ошибка от Joi или другой библиотеки валидации"));
      return;
    }
    next();
  };
  return func;
};

module.exports = validation;
