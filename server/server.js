const express = require("express");
const logger = require("./src/utils/logger");
const {
  errorHandler,
  logRequest,
  bodyParser,
  validation,
  cors,
} = require("./src/middleware");
require("dotenv").config();

const app = express();

// Register middleware
// app.use(logRequest);
app.use(bodyParser);
app.use(cors);
// app.use(validation);

// Routes
app.get("/", (req, res) => {
  logger.infof("GET / route hit");
  res.send("Test Calendar App");
});

// Register the error handler middleware last, after all other middleware and routes
// app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.infof("Server is running on http://localhost:%d", PORT);
});
