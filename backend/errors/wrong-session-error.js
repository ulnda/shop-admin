class WrongSessionError extends Error {
  constructor(parent) {
    super(parent);

    this.name = 'WrongSessionError';
  }
}

module.exports = WrongSessionError;