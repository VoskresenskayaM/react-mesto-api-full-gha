const { notFound } = require('../utils');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = notFound;
  }
}

module.exports = NotFoundError;
