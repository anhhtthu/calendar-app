const errorHandler = require("./errorHandler");
const logRequest = require("./logRequest");
const bodyParser = require("./bodyParser");
const validation = require("./validation");
const cors = require("./cors");

module.exports = {
  errorHandler,
  logRequest,
  bodyParser,
  validation,
  cors,
};
