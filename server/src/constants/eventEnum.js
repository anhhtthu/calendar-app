const EVENT_ENUM = {
  REMINDER: {
    AT_EVENT_TIME: "AT_EVENT_TIME",
    "5_MIN_BEFORE": "5_MIN_BEFORE",
    "30_MIN_BEFORE": "30_MIN_BEFORE",
    "1_HOUR_BEFORE": "1_HOUR_BEFORE",
    "1_DAY_BEFORE": "1_DAY_BEFORE",
    CUSTOM: "CUSTOM",
    NONE: "NONE",
  },
  EVENT_NOTIFY: {
    INVITATION: "INVITATION",
    REMINDER: "REMINDER",
  },
  INVITATION_STATUS: {
    INVITED: "INVITED",
    ACCEPTED: "ACCEPTED",
    DECLINED: "DECLINED",
  },
  RECURRING_PATTERN: {
    DAILY: "DAILY",
    WEEKLY: "WEEKLY",
    MONTHLY: "MONTHLY",
    YEARLY: "YEARLY",
  },
};

module.exports = EVENT_ENUM;
