class CustomError extends Error {
  constructor(errorCode, message, status) {
    super(message);
    this.errorCode = errorCode;
    this.status = status;
  }
}

module.exports = CustomError;
