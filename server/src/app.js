const express = require("express");
const logger = require("./utils/logger");
const { errorHandler, logRequest, bodyParser, cors, responseFormat } = require("./middleware");
const CustomError = require("./utils/customError");

const app = express();

// middleware for parsing JSON and logging requests
app.use(bodyParser)
app.use(logRequest)

// enable cors for all routes
app.use(cors)
app.use(responseFormat)

// Test Routes
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

// catch all unhandled routes
app.use((req, res, next) => {
    next(new CustomError(404, "Route Not Found", 404))
});

app.use(errorHandler);

module.exports = app;