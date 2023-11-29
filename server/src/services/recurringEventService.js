const { prisma } = require("../database/client");

const MAX_OCCURRENCES = 100;

exports.createRecurringEvent = async (mainEvent, recurringDetails) => {
  const { pattern, endDate, numberOfOccurrences } = recurringDetails;

  const maxEndDate = new Date(mainEvent.startTime);
  maxEndDate.setFullYear(maxEndDate.getFullYear() + 1);

  let occurrenceDate = mainEvent.startTime;
  let count = 0;

  // generate and create recurring event occurrences
  const occurCondition = !endDate || occurrenceDate <= endDate;
  while (
    count < MAX_OCCURRENCES &&
    occurCondition &&
    occurrenceDate <= maxEndDate
  ) {
    await prisma.recurringEvent.create({
      data: {
        eventId: mainEvent.id,
        pattern: pattern,
        endDate: occurrenceDate,
      },
    });

    occurrenceDate = getNextOccurrence(occurrenceDate, pattern);
    count++;
  }
};
