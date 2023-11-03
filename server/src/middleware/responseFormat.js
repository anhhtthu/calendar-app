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

  next();
}

module.exports = responseFormat;
