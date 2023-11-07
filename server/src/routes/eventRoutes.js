const express = require("express");
const eventController = require("../controllers/eventController");
const { authenticateToken } = require("../middleware/authenticateToken");
const ROUTES = require('../constants/routePaths')

const router = express.Router();

// Require authenticate JWT
// router.use(authenticateToken);

router.get(ROUTES.EVENTS.GET, (req, res, next) => {
    res.sendData({ foo: "bar" }, "Data fetched successfully");
});
// router.post(ROUTES.EVENTS.CREATE, eventController.createEvent);
// router.put(ROUTES.EVENTS.UPDATE, eventController.updateEvent);
// router.delete(ROUTES.EVENTS.DELETE, eventController.deleteEvent);

module.exports = router;
