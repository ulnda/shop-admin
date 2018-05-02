class WrongPermissionsError extends Error {
  constructor(parent) {
    super(parent);

    this.name = 'WrongPermissionsError';
  }
}

module.exports = WrongPermissionsError;