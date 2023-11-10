function responseFormat(req, res, next) {
  res.sendData = function (data, message = "Success") {
    const response = {
      statusCode: 200,
      errorCode: 0,
      message,
      data,
    };
    res.json(response);
  };

  res.sendError = function (statusCode, errorCode, message, data) {
    const response = {
      statusCode,
      errorCode,
      message,
      data
    }
    res.status(statusCode).json(response)
  }

  next();
}

module.exports = responseFormat;
