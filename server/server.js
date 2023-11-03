const express = require("express");
const logger = require("./src/utils/logger");
const {
  errorHandler,
  logRequest,
  bodyParser,
  validation,
  cors,
} = require("./src/middleware");
const responseFormat = require("./src/middleware/responseFormat");
const CustomError = require("./src/utils/customError");
require("dotenv").config();

const app = express();

// Register middleware
app.use(bodyParser);
app.use(logRequest);
app.use(cors);
// app.use(validation);
app.use(responseFormat);

// Routes
app.get("/", (req, res, next) => {
  logger.info("GET / route hit");
  res.send("Test Calendar App");
});

app.get("/test", (req, res, next) => {
  res.sendData({ foo: "bar" }, "Data fetched successfully");
});

app.get("/test-error", (req, res, next) => {
  throw new CustomError(123, "Custom error message", 400);
});

// Catch-all for unhandled routes 
app.use((req, res, next) => {
  next(new CustomError(404, "Route Not Found", 404));
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.infof("Server is running on http://localhost:%d", PORT);
});
