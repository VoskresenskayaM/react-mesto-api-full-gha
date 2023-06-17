const { noRights } = require('../utils');

class NoAccessRightsError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = noRights;
  }
}

module.exports = NoAccessRightsError;
