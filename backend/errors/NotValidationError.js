const { incorrectId } = require('../utils');

class NotValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = incorrectId;
  }
}

module.exports = NotValidationError;
