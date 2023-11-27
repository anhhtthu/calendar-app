const EVENT_ENUM = require("../constants/eventEnum");
const moment = require("moment");

exports.calculateReminderTime = (eventStartTime, reminderOption, customReminderTime) => {
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
