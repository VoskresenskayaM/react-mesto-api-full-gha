const { serverError } = require('../utils');

const HandlerError = (err, req, res, next) => {
  const { statusCode = serverError, message } = err;
  res.status(statusCode).send({
    message: statusCode === serverError
      ? 'На сервере произошла ошибка'
      : message,
  });
};

module.exports = HandlerError;
