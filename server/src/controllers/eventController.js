const { logger } = require("../utils/logger");
const eventService = require('../services/eventService');

exports.createEvent = async (req, res, next) => {
  try {
    const userId = 3;
    // const userId = req.user.id;
    const eventData = req.body;

    // Validate event input
    eventService.validateEventInput(eventData);

    // Create event in user's calendar
    const newEvent = await eventService.createEvent(userId, eventData);

    // Process invitees
    await eventService.processInvitees(newEvent, eventData.invitees);

    // Setup event reminder
    await eventService.setupEventReminder(newEvent, eventData.reminderOption, eventData.customReminderTime, userId);

    res.sendData("Event created successfully", newEvent);
  } catch (error) {
    logger.errorf("Error creating event: %v", error);
    return res.sendError(error.status, error.errorCode, error.message);
  }
};

exports.listEvents = async (req, res, next) => {
  try {
    const { timeframe, year, month } = req.query;
    // const userId = req.user.id;
    const userId = 2;

    const events = await eventService.listEvents(userId, timeframe, year, month);

    res.sendData("List events retrieved successfully", events);
  } catch (error) {
    logger.errorf("Error listing events: %v", error);
    return res.sendError(error.status, error.errorCode, error.message);
  }
};

exports.getEventById = async (req, res, next) => {
  try {
    const eventId = parseInt(req.params.eventId);
    const event = await eventService.getEventById(eventId);

    res.sendData("Event retrieved successfully", event);
  } catch (error) {
    logger.errorf("Error retrieved event: %v", error);
    return res.sendError(error.status, error.errorCode, error.message);
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const eventId = parseInt(req.params.eventId);
    const eventData = req.body;

    // eventService.validateEventInput(eventData);

    const updatedEvent = await eventService.updateEvent(eventId, eventData);

    res.sendData("Event updated successfully", updatedEvent);
  } catch (error) {
    logger.errorf("Error updating event: %v", error);
    return res.sendError(error.status, error.errorCode, error.message);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;

    await eventService.deleteEvent(eventId);

    res.sendData("Event deleted successfully");
  } catch (error) {
    logger.errorf("Error deleting event: %v", error);
    return res.sendError(error.status, error.errorCode, error.message);
  }
};