import React from "react";
import dayjs from "dayjs";
import monthStyles from "./month.module.css";
export default function DayInMonth(props) {
  const { day } = { ...props };

  function isToday() {
    return dayjs().isSame(day, "day");
  }

  return (
    <div
      className={`border ${
        isToday() ? monthStyles.today : "border-gray-200"
      } flex flex-row px-2`}
    >
      <p className="text-md text-gray-500 font-semibold p-1 my-1 text-left">
        {day.format("DD")}
      </p>
      {isToday() && <span className={monthStyles.isToday}></span>}
    </div>
  );
}
