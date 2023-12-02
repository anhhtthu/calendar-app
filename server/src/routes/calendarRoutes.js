const express = require("express");
const { authenticateToken } = require("../middleware");
const calendarController = require("../controllers/calendarController");
const ROUTES = require("../constants/routePaths");

const router = express.Router();

// Authenticate JWT
// router.use(authenticateToken);

router.post("/", calendarController.createCalendar);
// router.get(ROUTES.EVENTS.GET, eventController.listEvents);
// router.get(ROUTES.EVENTS.GET_BY_ID, eventController.getEventById);
// router.put(ROUTES.EVENTS.UPDATE, eventController.updateEvent);
// router.delete(ROUTES.EVENTS.DELETE, eventController.deleteEvent);

module.exports = router;
