const jwt = require('jsonwebtoken');

/* const { NODE_ENV, JWT_SECRET } = process.env; */
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
    /* NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', */
  } catch (err) {
    throw new IncorrectDataUserError('Необходима авторизация');
  }
  req.user = payload;
  next();
};
