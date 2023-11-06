import React, { useState, useContext, useEffect } from "react";
import dayjs from "dayjs";
import GlobalContext from "../../context/GlobalContext";
import { getMonth } from "../../utils";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";

export default function SmallCalendar() {
  //local state for small calendar
  const [currentMonthSmallCalendarIdx, setCurrentMonthSmallCalendarIdx] =
    useState(dayjs().month());
  const [monthSmallCalendar, setMonthSmallCalendar] = useState(getMonth());
  const {
    monthIndex,
    trigger,
    setSmallCalendarMonth,
    selectedDate,
    setSelectedDate,
  } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthSmallCalendarIdx(monthIndex);
  }, [monthIndex, trigger]);

  useEffect(() => {
    setMonthSmallCalendar(getMonth(currentMonthSmallCalendarIdx));
  }, [currentMonthSmallCalendarIdx]);

  function handlePrevMonth() {
    setCurrentMonthSmallCalendarIdx(currentMonthSmallCalendarIdx - 1);
  }

  function handleNextMonth() {
    setCurrentMonthSmallCalendarIdx(currentMonthSmallCalendarIdx + 1);
  }

  function isToday(day) {
    const format = "DD-MM-YYYY";
    const today = dayjs().format(format);
    const secDate = selectedDate && selectedDate.format(format);
    const currentDay = day.format(format);
    if (today === currentDay) {
      return "bg-violet-600 text-white rounded-md";
    } else if (secDate === currentDay) {
      return "bg-violet-200 text-violet-600 rounded-md text-bold";
    } else {
      return "text-gray-500";
    }
  }

  function handleSelected() {
    setSmallCalendarMonth(currentMonthSmallCalendarIdx);
  }

  return (
    <div className="mt-9">
      <header className="flex justify-between">
        <button onClick={handlePrevMonth}>
          <BsChevronLeft />
        </button>
        <p className="text-gray-500 font-bold">
          {dayjs(new Date(dayjs().year(), currentMonthSmallCalendarIdx)).format(
            "MMMM YYYY"
          )}
        </p>
        <button onClick={handleNextMonth}>
          <BsChevronRight />
        </button>
      </header>
      <div className="grid grid-cols-7 grid-rows-6 ">
        {monthSmallCalendar[0].map((day, index) => (
          <span key={index} className="text-gray-500 text-sm py-1">
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {monthSmallCalendar.map((row, index) => (
          <React.Fragment key={index}>
            {row.map((day, index) => {
              return (
                <button
                  key={index}
                  className={`py-1 w-full ${isToday(day)}`}
                  onClick={() => {
                    setSelectedDate(day);
                    handleSelected();
                  }}
                >
                  <span className={`text-sm`}>{day.format("D")}</span>
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
