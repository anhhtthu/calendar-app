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
