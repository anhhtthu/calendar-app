const express = require("express");
const { authenticateToken } = require("../middleware");
const calendarController = require("../controllers/calendarController");
const ROUTES = require("../constants/routePaths");

const router = express.Router();

// Authenticate JWT
router.use(authenticateToken);

router.post("/", calendarController.createCalendar);
router.get("/", calendarController.getCalendar);
router.put("/", calendarController.updateCalendar);

module.exports = router;
