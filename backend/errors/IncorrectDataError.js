const { incorrectEmail } = require('../utils');

class IncorrectDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = incorrectEmail;
  }
}

module.exports = IncorrectDataError;
