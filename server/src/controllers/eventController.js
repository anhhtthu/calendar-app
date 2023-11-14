const { logger } = require("../utils/logger");
const { validateEventInput, createEventForUser, processInvitees, setupEventReminder } = require('../services/eventService');

exports.createEvent = async (req, res, next) => {
  try {
    const userId = 2;
    // const userId = req.user.id;
    const eventData = req.body;

    // Validate event input
    validateEventInput(eventData);

    // Create event in user's calendar
    const newEvent = await createEventForUser(userId, eventData);

    // Process invitees
    await processInvitees(newEvent, eventData.invitees);

    // Setup event reminder
    await setupEventReminder(newEvent, eventData.reminderOption, eventData.customReminderTime, userId);

    res.sendData("Event created successfully", newEvent);
  } catch (error) {
    logger.errorf("Error creating event: %v", error);
    return res.sendError(error.status, error.errorCode, error.message);
  }
};

exports.listEvents = async (req, res, next) => {
  res.sendData("Data fetched successfully", { foo: "bar" });
};

exports.getEventById = async (req, res, next) => {};

exports.updateEvent = async (req, res, next) => {};

exports.deleteEvent = async (req, res, next) => {};
