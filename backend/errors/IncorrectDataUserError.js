const { incorrectUserPasswordOrEmail } = require('../utils');

class IncorrectDataUserError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = incorrectUserPasswordOrEmail;
  }
}

module.exports = IncorrectDataUserError;
