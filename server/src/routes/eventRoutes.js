const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { authenticateToken } = require("../middleware/authenticateToken");

// Require authenticate JWT
router.use(authenticateToken);

router.get("/", eventController.getEvents);
router.post("/", eventController.createEvent);
router.put("/:eventId", eventController.updateEvent);
router.delete("/:eventId", eventController.deleteEvent);

module.exports = router;
