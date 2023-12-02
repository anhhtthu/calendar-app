const { prisma } = require("../database/client");
const ERROR_CODE = require("../constants/errorCode");

// Controller methods for CRUD operations
exports.createCalendar = async (userId, settings) => {
  // Create a new calendar
  const calendar = await prisma.calendar.create({
    data: {
      userId,
      settings,
    },
  });

  return calendar;
};

exports.getCalendar = async (userId) => {
  // Find the calendar for the specified user
  const calendar = await prisma.calendar.findUnique({
    where: {
      userId,
    },
  });
  if (!calendar) {
    throw {
      status: 404,
      errorCode: ERROR_CODE.CALENDAR_NOT_FOUND,
      message: "Calendar not found",
    };
  }

  return calendar;
};

exports.updateCalendar = async (userId, settings) => {
  // Find and update the calendar for the specified user
  const calendar = await prisma.calendar.update({
    where: {
      userId,
    },
    data: {
      settings,
    },
  });
  if (!calendar) {
    throw {
      status: 404,
      errorCode: ERROR_CODE.CALENDAR_NOT_FOUND,
      message: "Calendar not found",
    };
  }

  return calendar;
};
