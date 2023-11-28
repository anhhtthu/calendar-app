const ERROR_CODE = require("../constants/errorCode");
const { prisma } = require("../database/client");
const CustomError = require("../utils/customError");
const {
  updateEventReminder,
  updateInvitees,
  calculateTimeframeDates,
  notifyAttendeesOfUpdates,
} = require("./eventServiceHelpers");

// CREATE EVENT LOGIC
exports.createEvent = async (userId, eventData) => {
  let {
    calendarId,
    title,
    description,
    location,
    startTime,
    endTime,
    allDay,
    eventType,
    color,
  } = eventData;

  // retrieve user's calendar
  const calendar = calendarId
    ? await prisma.calendar.findUnique({
        where: { id: calendarId, userId: userId },
      })
    : await prisma.calendar.findFirst({ where: { userId: userId } });

  if (!calendar) {
    throw new CustomError(
      404,
      ERROR_CODE.CALENDAR_NOT_FOUND,
      "Calendar not found for the user"
    );
  }

  startTime = new Date(startTime);
  endTime = new Date(endTime);

  // handle all day events
  if (allDay) {
    startTime = new Date(startTime.setHours(0, 0, 0, 0));
    endTime = new Date(endTime.setHours(23, 59, 59, 999));
  } else if (startTime >= endTime) {
    throw new CustomError(
      400,
      ERROR_CODE.EVENT_TIME_INVALID,
      "Start time must be before end time."
    );
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

// GET EVENT BY ID LOGIC
exports.getEventById = async (userId, eventId) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: { calendar: true, eventAttendees: true, notifications: true },
  });

  if (!event) {
    throw new CustomError(404, ERROR_CODE.EVENT_NOT_FOUND, "Event not found");
  }

  const isOwner = event.calendar.userId === userId;
  const isAttendee = event.eventAttendees.some(
    (attendee) => attendee.attendeeId === userId
  );
  if (!isOwner && !isAttendee) {
    throw new CustomError(
      403,
      ERROR_CODE.EVENT_UNAUTHORIZE,
      "Unauthorized access"
    );
  }

  return event;
};

// GET LIST EVENTS LOGIC
// exports.listEvents = async (userId, timeframe, year, month) => {
//   const { startDate, endDate } = calculateTimeframeDates(
//     timeframe,
//     year,
//     month
//   );

//   const events = await prisma.event.findMany({
//     where: {
//       calendar: {
//         user: {
//           id: userId,
//         },
//       },
//       startTime: { gte: startDate.toDate() },
//       endTime: { lte: endDate.toDate() },
//     },
//     orderBy: { startTime: "asc" },
//   });

//   if (events.length === 0) {
//     throw new CustomError(404, ERROR_CODE.EVENT_NOT_FOUND, "No events found");
//   }

//   return events;
// };
exports.listEvents = async (userId, timeframe, year, month) => {
  const { startDate, endDate } = calculateTimeframeDates(
    timeframe,
    year,
    month
  );

  const events = await prisma.event.findMany({
    where: {
      OR: [
        { calendar: { userId } },
        { eventAttendees: { some: { attendeeId: userId } } },
      ],
      startTime: { gte: startDate.toDate() },
      endTime: { lte: endDate.toDate() },
    },
    include: { eventAttendees: true, notifications: true },
    orderBy: { startTime: "asc" },
  });

  return events.length > 0 ? events : [];
};

// UPDATE EVENT LOGIC
exports.updateEvent = async (eventId, newEventData, userId) => {
  // retrieve the existing event
  const existingEvent = await prisma.event.findUnique({
    where: { id: eventId },
    include: { calendar: true, eventAttendees: true },
  });
  if (!existingEvent) {
    throw new CustomError(404, ERROR_CODE.EVENT_NOT_FOUND, "Event not found");
  }

  if (existingEvent.calendar.userId !== userId) {
    throw new CustomError(
      403,
      ERROR_CODE.EVENT_UNAUTHORIZE,
      "Unauthorized access"
    );
  }

  // prepare the updated data
  let updateData = {};
  for (const key in newEventData) {
    if (newEventData.hasOwnProperty(key) && key !== "invitees") {
      updateData[key] = newEventData[key];
    }
  }

  // validate start and end time
  if (
    updateData.startTime &&
    updateData.endTime &&
    updateData.startTime >= updateData.endTime
  ) {
    throw new CustomError(
      400,
      ERROR_CODE.EVENT_TIME_INVALID,
      "Start time must be before end time."
    );
  }
  if (updateData.startTime) {
    updateData.startTime = new Date(updateData.startTime);
  }
  if (updateData.endTime) {
    updateData.endTime = new Date(updateData.endTime);
  }

  // update event
  const updatedEvent = await prisma.event.update({
    where: { id: eventId },
    data: updateData,
  });

  // detect changes that require attendee notification
  const shouldNotifyAttendees =
    updateData.startTime !== existingEvent.startTime ||
    updateData.endTime !== existingEvent.endTime;

  if (shouldNotifyAttendees) {
    await notifyAttendeesOfUpdates(eventId, existingEvent.eventAttendees);
  }

  // update reminders if necessary
  if (
    "reminderOption" in newEventData ||
    "customReminderTime" in newEventData
  ) {
    await updateEventReminder(eventId, newEventData, userId);
  }

  // update invitees if the list is provided
  if ("invitees" in newEventData) {
    await updateInvitees(eventId, newEventData.invitees, existingEvent);
  }

  return updatedEvent;
};

// DELETE EVENT LOGIC
exports.deleteEvent = async (eventId) => {};
