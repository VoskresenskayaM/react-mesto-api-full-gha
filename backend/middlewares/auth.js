const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils');
const IncorrectDataUserError = require('../errors/IncorrectDataUserError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new IncorrectDataUserError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new IncorrectDataUserError('Необходима авторизация');
  }
  req.user = payload;
  next();
};
