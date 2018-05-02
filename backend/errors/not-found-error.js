class NotFoundError extends Error {
  constructor(parent) {
    super(parent);

    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;