class ExpressError extends Error {
  constructor(status, message) {
    super();
    this.message = message;
    this.statue = status;
  }
}

module.exports = ExpressError;
