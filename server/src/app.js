const express = require("express");
const logger = require("./utils/logger");
const { errorHandler, logRequest, bodyParser, cors, responseFormat } = require("./middleware");
const CustomError = require("./utils/customError");
require("dotenv").config();

const ROUTES = require('./constants/routePaths')
const eventRoutes = require('./routes/eventRoutes')

const app = express();

app.use(bodyParser)
app.use(logRequest)
app.use(cors)
app.use(responseFormat)

// Routes
// app.get("/", (req, res, next) => {
//     logger.info("GET / route hit");
//     res.send("Test Calendar App");
// });

// app.get("/test", (req, res, next) => {
//     res.sendData({ foo: "bar" }, "Data fetched successfully");
// });

// app.get("/test-error", (req, res, next) => {
//     throw new CustomError(123, "Custom error message", 400);
// });

app.use(ROUTES.EVENTS.BASE, eventRoutes)

// catch all unhandled routes
app.use((req, res, next) => {
    next(new CustomError(404, "Route Not Found", 404))
});

app.use(errorHandler);

module.exports = app;