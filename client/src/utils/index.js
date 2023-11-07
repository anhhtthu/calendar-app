import dayjs from "dayjs";

export function getMonth(month = dayjs().month()) {
  const year = dayjs().year();
  const firstDayOFTheMonth = dayjs(new Date(year, month, 1)).day();
  let generateMonth = 0 - firstDayOFTheMonth;
  const generateMonthDaysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      generateMonth++;
      return dayjs(new Date(year, month, generateMonth));
    });
  });
  return generateMonthDaysMatrix;
}

export function getWeek(day = dayjs()) {
  const startOfWeek = day.startOf("week");
  let generateHour = 0;
  const generateWeekHoursMatrix = new Array(24).fill(null).map(() => {
    generateHour++;
    return new Array(7).fill(null).map((dayOffSet, index) => {
      return startOfWeek
        .clone()
        .add(index, "day")
        .hour(generateHour % 24);
    });
  });
  return generateWeekHoursMatrix;
}
