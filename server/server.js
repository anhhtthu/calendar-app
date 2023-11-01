const express = require("express");
const cors = require("cors");
const logger = require("./src/utils/logger");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get("/", (req, res) => {
  logger.infof("GET / route hit");
  res.send("Test Calendar App");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.infof('Server is running on http://localhost:%d', PORT)
});
