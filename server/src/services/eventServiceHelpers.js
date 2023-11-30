const EVENT_ENUM = require("../constants/eventEnum");
const moment = require("moment");
const { prisma } = require("../database/client");

const calculateReminderTime = (
  eventStartTime,
  reminderOption,
  customReminderTime
) => {
  let reminderTime;

  if (reminderOption !== undefined && reminderOption !== null) {
    switch (reminderOption) {
      case EVENT_ENUM.REMINDER.AT_EVENT_TIME:
        reminderTime = new Date(eventStartTime);
        break;

      case EVENT_ENUM.REMINDER["5_MIN_BEFORE"]:
        reminderTime = moment(eventStartTime).subtract(5, "minutes").toDate();
        break;

      case EVENT_ENUM.REMINDER["30_MIN_BEFORE"]:
        reminderTime = moment(eventStartTime).subtract(30, "minutes").toDate();
        break;

      case EVENT_ENUM.REMINDER["1_HOUR_BEFORE"]:
        reminderTime = moment(eventStartTime).subtract(1, "hours").toDate();
        break;

      case EVENT_ENUM.REMINDER["1_DAY_BEFORE"]:
        reminderTime = moment(eventStartTime).subtract(1, "days").toDate();
        break;

      case EVENT_ENUM.REMINDER.CUSTOM:
        if (
          customReminderTime &&
          moment(customReminderTime, moment.ISO_8601, true).isValid()
        ) {
          reminderTime = new Date(customReminderTime);
        } else {
          throw new CustomError(
            400,
            ERROR_CODE.EVENT_REMINDER_TIME_INVALID,
            "Invalid custom reminder time."
          );
        }
        break;

      default:
        throw new CustomError(
          400,
          ERROR_CODE.EVENT_REMINDER_OPTION_INVALID,
          "Invalid reminder option."
        );
    }
  }

  return reminderTime;
};

exports.calculateTimeframeDates = (timeframe, year, month) => {
  const now = moment();
  year ??= now.year();
  month ??= now.month() + 1;

  let startDate, endDate;

  switch (timeframe) {
    case "day":
      startDate = now.clone().startOf("day");
      endDate = now.clone().endOf("day");
      break;

    case "week":
      let referenceDate = moment([year, month - 1]);

      if (
        now.month() === referenceDate.month() &&
        now.year() === referenceDate.year()
      ) {
        startDate = now.clone().startOf("isoWeek");
        endDate = now.clone().endOf("isoWeek");
      } else {
        // If the current date is outside the provided month and year, use the first day of the provided month to determine the week
        startDate = referenceDate.clone().startOf("isoWeek");
        endDate = startDate.clone().endOf("isoWeek");
      }
      break;

    case "month":
      startDate = moment([year, month - 1]).startOf("month");
      endDate = moment([year, month - 1]).endOf("month");
      break;

    default:
      throw new CustomError(
        400,
        ERROR_CODE.EVENT_INVALID_TIMEFRAME,
        "Invalid timeframe"
      );
  }

  return { startDate, endDate };
};

exports.validateEventInput = (eventData) => {
  let { title, startTime, endTime, eventType } = eventData;

  if (!title || !eventType || !startTime || !endTime) {
    throw new CustomError(
      400,
      ERROR_CODE.EVENT_INPUT_REQUIRED,
      "Missing required fields"
    );
  }

  if (
    !moment(startTime, moment.ISO_8601, true).isValid() ||
    !moment(endTime, moment.ISO_8601, true).isValid()
  ) {
    throw new CustomError(
      400,
      ERROR_CODE.EVENT_INPUT_INVALID,
      "Invalid date format. Use ISO 8601 format."
    );
  }
};

exports.setupEventReminder = async (
  newEvent,
  reminderOption,
  customReminderTime,
  userId
) => {
  const reminderTime = calculateReminderTime(
    newEvent.startTime,
    reminderOption,
    customReminderTime
  );

  if (reminderTime) {
    await prisma.notification.create({
      data: {
        eventId: newEvent.id,
        userId: userId,
        type: EVENT_ENUM.EVENT_NOTIFY.REMINDER,
        sendAt: reminderTime,
      },
    });
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

      // create EventAttendee and Notification for each invitee
      const eventAttendee = await prisma.eventAttendee.create({
        data: {
          eventId: newEvent.id,
          attendeeId: user.id,
          status: EVENT_ENUM.INVITATION_STATUS.INVITED,
        },
      });

      // create notification for invitation
      await prisma.notification.create({
        data: {
          eventId: newEvent.id,
          userId: user.id,
          eventAttendeeId: eventAttendee.id,
          type: EVENT_ENUM.EVENT_NOTIFY.INVITATION,
          sendAt: new Date(newEvent.startTime),
        },
      });
    }
  }
};

exports.updateEventReminder = async (eventId, newEventData, userId) => {
  const reminderOption = newEventData.reminderOption;

  // handle no reminder case
  if (reminderOption === EVENT_ENUM.REMINDER.NONE) {
    await prisma.notification.deleteMany({
      where: { eventId: eventId, type: EVENT_ENUM.EVENT_NOTIFY.REMINDER },
    });
    return;
  }

  const reminderTime = calculateReminderTime(
    newEventData.startTime,
    reminderOption,
    newEventData.customReminderTime
  );

  // check if an existing reminder needs to be updated or a new one created
  const existingReminder = await prisma.notification.findFirst({
    where: { eventId: eventId, type: EVENT_ENUM.EVENT_NOTIFY.REMINDER },
  });

  if (existingReminder) {
    if (existingReminder.sendAt.getTime() !== reminderTime.getTime()) {
      await prisma.notification.update({
        where: { id: existingReminder.id },
        data: { sendAt: reminderTime, sent: false },
      });
    }
  } else {
    await prisma.notification.create({
      data: {
        eventId: eventId,
        userId: userId,
        type: EVENT_ENUM.EVENT_NOTIFY.REMINDER,
        sendAt: reminderTime,
      },
    });
  }
};

exports.updateInvitees = async (eventId, newInvitees, originalEventData) => {
  const existingInviteeEvents = await prisma.eventAttendee.findMany({
    where: { eventId: eventId },
    include: {
      attendee: true,
    },
  });

  const inviteeMap = new Map(
    existingInviteeEvents.map((ie) => [
      ie.attendee.email || ie.attendee.userName,
      ie,
    ])
  );

  const newInvites = newInvitees.filter((invitee) => !inviteeMap.has(invitee));
  const removedInvites = existingInviteeEvents.filter(
    (ie) => !newInvitees.includes(ie.attendee.email || ie.attendee.userName)
  );

  // process new invitations
  await this.processInvitees(originalEventData, newInvites);

  // process removed invitations
  for (const inviteeEvent of removedInvites) {
    await prisma.eventAttendee.delete({ where: { id: inviteeEvent.id } });
  }
};

exports.notifyAttendeesOfUpdates = async (eventId, attendees) => {
  // Logic to create and send notifications to attendees
  for (const attendee of attendees) {
    await prisma.notification.create({
      data: {
        userId: attendee.attendeeId,
        eventId: eventId,
        type: "EVENT_UPDATE",
        message: "Event details have been updated.",
        sent: false, // assuming notifications are sent out by a separate process
        sendAt: new Date(), // set appropriate time for sending the notification
      },
    });
  }
};
