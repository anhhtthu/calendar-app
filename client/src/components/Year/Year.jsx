import React, { useEffect } from "react";
import dayjs from "dayjs";

export default function Year({ year }) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  //function to check if the date is today
  function isToday(date, i) {
    const format = "YYYY-MM-DD";
    const today = dayjs().format(format);
    const currentDay = date.format(format);
    const commonClasses = [
      "flex",
      "items-center",
      "justify-center",
      "w-6",
      "h-6",
      "rounded-full",
      "cursor-pointer",
    ];

    if (today === currentDay && date.month() === i) {
      return [...commonClasses, "bg-violet-600", "text-white"].join(" ");
    } else {
      return [
        ...commonClasses,
        date.month() === i ? "text-gray-800" : "text-gray-400",
        "hover:bg-gray-100",
      ].join(" ");
    }
  }

  return (
    <div className="grid grid-cols-4 gap-4 p-4 overflow-auto h-[650px] scrollbar scrollbar-thumb-gray-200 scrollbar-track-gray-100">
      {year.map((month, i) => {
        // Find the first day that actually belongs to the current month
        const firstDay = month.flat().find((day) => day.month() === i);

        return (
          <div key={i} className="p-2 px-3 py-3 text-xs ">
            <h2 className="text-left pl-2 font-semibold text-gray-500 text-sm mb-2">
              {firstDay ? firstDay.format("MMMM") : ""}
            </h2>
            <div className="grid grid-cols-7 gap-1">
              {daysOfWeek.map((day, j) => (
                <div key={j} className="px-1 py-1 text-center text-gray-500">
                  {day}
                </div>
              ))}
              {month.flat().map((day, j) => (
                <div key={j} className={isToday(day, i)}>
                  {day.date()}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
