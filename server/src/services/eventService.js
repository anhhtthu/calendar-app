const ERROR_CODE = require("../constants/errorCode");
const EVENT_ENUM = require("../constants/eventEnum");
const { prisma } = require("../database/client");
const CustomError = require("../utils/customError");
const moment = require("moment");
const { logger } = require("../utils/logger");
const { calculateReminderTime } = require("./eventServiceHelpers");

// CREATE EVENT LOGIC
exports.createEvent = async (userId, eventData) => {
  let { calendarId, title, description, location, startTime, endTime, allDay, eventType, color } = eventData;

  // retrieve user's calendar
  const calendar = calendarId
    ? await prisma.calendar.findUnique({ where: { id: calendarId, userId: userId } })
    : await prisma.calendar.findFirst({ where: { userId: userId } });

  if (!calendar) {
    throw new CustomError(404, ERROR_CODE.CALENDAR_NOT_FOUND, "Calendar not found for the user");
  }

  startTime = new Date(startTime);
  endTime = new Date(endTime);

  // handle all day events
  if (allDay) {
    startTime = new Date(startTime.setHours(0, 0, 0, 0));
    endTime = new Date(endTime.setHours(23, 59, 59, 999));
  } else if (startTime >= endTime) {
    throw new CustomError(400, ERROR_CODE.EVENT_TIME_INVALID, "Start time must be before end time.");
  }

  const newEvent = await prisma.event.create({
    data: {
      calendarId: calendar.id,
      title,
      description,
      location,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      allDay: allDay,
      eventType,
      color,
    },
  });

  return newEvent;
};

exports.validateEventInput = (eventData) => {
  let { title, startTime, endTime, eventType } = eventData;

  if (!title || !eventType || !startTime || !endTime) {
    throw new CustomError(400, ERROR_CODE.EVENT_INPUT_REQUIRED, "Missing required fields");
  }

  if (!moment(startTime, moment.ISO_8601, true).isValid() || !moment(endTime, moment.ISO_8601, true).isValid()) {
    throw new CustomError(400, ERROR_CODE.EVENT_INPUT_INVALID, "Invalid date format. Use ISO 8601 format.");
  }
};

exports.processInvitees = async (newEvent, invitees) => {
  if (invitees && Array.isArray(invitees)) {
    for (const invitee of invitees) {
      const user = await prisma.user.findFirst({
        where: { OR: [{ email: invitee }, { userName: invitee }] },
      });

      if (!user) {
        logger.errorf("Invitee user not found: %v", invitee);
        continue;
      }

      // check if invitee has calendar
      let inviteeCalendar = await prisma.calendar.findFirst({
        where: { userId: user.id },
      });
      if (!inviteeCalendar) {
        continue;
      }

      const inviteeEvent = await prisma.event.create({
        data: {
          calendarId: inviteeCalendar.id,
          title: newEvent.title,
          description: newEvent.description,
          location: newEvent.location,
          startTime: new Date(newEvent.startTime),
          endTime: new Date(newEvent.endTime),
          allDay: newEvent.allDay,
          eventType: newEvent.eventType,
          color: newEvent.color,
        },
      });

      // create EventAttendee and Notification for each invitee
      const eventAttendee = await prisma.eventAttendee.create({
        data: {
          eventId: inviteeEvent.id,
          attendeeId: user.id,
          status: "INVITED",
        },
      });

      // create notification for invitation
      await prisma.notification.create({
        data: {
          eventId: inviteeEvent.id,
          userId: user.id,
          eventAttendeeId: eventAttendee.id,
          type: EVENT_ENUM.EVENT_TYPE.INVITATION,
          sendAt: new Date(newEvent.startTime),
        },
      });
    }
  }
};

exports.setupEventReminder = async (newEvent, reminderOption, customReminderTime, userId) => {
  const reminderTime = calculateReminderTime(newEvent.startTime, reminderOption, customReminderTime)

  if (reminderTime) {
    await prisma.notification.create({
      data: {
        eventId: newEvent.id,
        userId: userId,
        type: EVENT_ENUM.EVENT_TYPE.REMINDER,
        sendAt: reminderTime,
      },
    });
  }
};

// GET EVENT BY ID LOGIC
exports.getEventById = async (eventId) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: { eventAttendees: true, notifications: true },
  });

  if (!event) {
    throw new CustomError(404, ERROR_CODE.EVENT_NOT_FOUND, "Event not found");
  }

  return event;
};

// GET LIST EVENTS LOGIC
exports.listEvents = async (userId, timeframe, year, month) => {
  let startDate, endDate;
  const now = moment();

  switch (timeframe) {
    case "day":
      startDate = now.clone().startOf("day");
      endDate = now.clone().endOf("day");
      break;

    case "week":
      let referenceDate = moment([year, month - 1]);

      if (now.month() === referenceDate.month() && now.year() === referenceDate.year()) {
        startDate = now.clone().startOf("isoWeek");
        endDate = now.clone().endOf("isoWeek");
      } else {
        // If the current date is outside the provided month and year, use the first day of the provided month to determine the week
        startDate = referenceDate.clone().startOf("isoWeek");
        endDate = startDate.clone().endOf('isoWeek');
      }
      break;

    case "month":
      startDate = moment([year, month - 1]).startOf("month");
      endDate = moment([year, month - 1]).endOf("month");
      break;

    default:
      throw new CustomError(400, ERROR_CODE.EVENT_INVALID_TIMEFRAME, "Invalid timeframe");
  }

  const events = await prisma.event.findMany({
    where: {
      calendar: {
        user: {
          id: userId,
        },
      },
      startTime: { gte: startDate.toDate() },
      endTime: { lte: endDate.toDate() },
    },
    orderBy: { startTime: "asc" },
  });

  if (events.length === 0) {
    throw new CustomError(404, ERROR_CODE.EVENT_NOT_FOUND, "No events found");
  }

  return events;
};

// UPDATE EVENT LOGIC
exports.updateEvent = async (eventId, newEventData) => {
  // retrieve the existing event
  const existingEvent = await prisma.event.findUnique({
    where: { id: eventId },
  });
  if (!existingEvent) {
    throw new CustomError(404, ERROR_CODE.EVENT_NOT_FOUND, "Event not found");
  }

  let updateData = {};
  for (const key in newEventData) {
    if (newEventData.hasOwnProperty(key)) {
      updateData[key] = newEventData[key];
    }
  }

  // handling for date fields
  if (updateData.startTime >= updateData.endTime) {
    throw new CustomError(400, ERROR_CODE.EVENT_TIME_INVALID, "Start time must be before end time.");
  }
  if (updateData.startTime) {
    updateData.startTime = new Date(updateData.startTime);
  }
  if (updateData.endTime) {
    updateData.endTime = new Date(updateData.endTime);
  }

  const updatedEvent = await prisma.event.update({
    where: { id: eventId },
    data: updateData,
  });

  return updatedEvent;
};

exports.updateEventReminder = async (eventId, newEventData, userId) => {
  if ('reminderOption' in newEventData) {
    if (newEventData.reminderOption === EVENT_ENUM.REMINDER.NONE) {
      // delete existing reminder
      await prisma.notification.deleteMany({
        where: { eventId: eventId, type: EVENT_ENUM.EVENT_TYPE.REMINDER }
      });
    } else {
      const existingReminder = await prisma.notification.findFirst({
        where: { eventId: eventId, type: EVENT_ENUM.EVENT_TYPE.REMINDER }
      });

      const reminderTime = calculateReminderTime(newEventData.startTime, newEventData.reminderOption, newEventData.customReminderTime)

      if (existingReminder) {
        return await prisma.notification.update({
          where: { id: existingReminder.id },
          data: { sendAt: reminderTime, sent: false },
        });
      }

      return await prisma.notification.create({
        data: {
          eventId: eventId,
          userId: userId,
          type: EVENT_ENUM.EVENT_TYPE.REMINDER,
          sendAt: reminderTime,
        },
      });
    }
  }
};

exports.updateInvitees = async (eventId, newInvitees) => {
  
};

// DELETE EVENT LOGIC
exports.deleteEvent = async (eventId) => {

};