// Import necessary modules and dependencies
const calendarService = require("../services/calendarService");
const { logger } = require("../utils/logger");

// Controller methods for CRUD operations

// Create a new calendar for a user
exports.createCalendar = async (req, res) => {
  try {
    const userId = 1;
    const { settings } = req.body;

    // Create a new calendar
    const calendar = await calendarService.createCalendar(userId, settings);

    // Save the calendar to the database
    res.sendData("Calendar created successfully", calendar);
  } catch (error) {
    logger.errorf("Error creating calendar: %v", error);
    return res.sendError(error.status, error.errorCode, error.message);
  }
};
// Get a user's calendar
exports.getCalendar = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the calendar for the specified user
    const calendar = await Calendar.findOne({ userId });

    if (!calendar) {
      return res.status(404).json({ error: "Calendar not found" });
    }

    res.json(calendar);
  } catch (error) {
    res.status(500).json({ error: "Failed to get calendar" });
  }
};
// Update a user's calendar
exports.updateCalendar = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, events } = req.body;

    // Find and update the calendar for the specified user
    const calendar = await Calendar.findOneAndUpdate(
      { userId },
      { name, events },
      { new: true }
    );

    if (!calendar) {
      return res.status(404).json({ error: "Calendar not found" });
    }

    res.json(calendar);
  } catch (error) {
    res.status(500).json({ error: "Failed to update calendar" });
  }
};
// Delete a user's calendar
exports.deleteCalendar = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find and delete the calendar for the specified user
    const calendar = await Calendar.findOneAndDelete({ userId });

    if (!calendar) {
      return res.status(404).json({ error: "Calendar not found" });
    }

    res.json({ message: "Calendar deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete calendar" });
  }
};
