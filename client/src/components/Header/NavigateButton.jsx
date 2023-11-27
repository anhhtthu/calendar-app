import React, { useContext, useEffect } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import GlobalContext from "../../context/GlobalContext";
import weekOfYear from "dayjs/plugin/weekOfYear";
import dayjs from "dayjs";

export default function NavigateButton() {
  dayjs.extend(weekOfYear);
  const {
    monthIndex,
    setMonthIndex,
    trigger,
    setTrigger,
    setWeekIndex,
    weekIndex,
    dayIndex,
    setDayIndex,
    currentView,
    setDirection,
  } = useContext(GlobalContext);

  function handlePrevMonth() {
    if (currentView === "month") {
      setMonthIndex(monthIndex - 1);
      setWeekIndex(weekIndex.subtract(1, "month").startOf("week"));
    } else if (currentView === "week") {
      let prevWeek = weekIndex.subtract(1, "week");
      setWeekIndex(prevWeek);
      if (prevWeek.month() !== weekIndex.month()) {
        setMonthIndex(monthIndex - 1);
      }
    } else if (currentView === "day") {
      let prevDay = dayIndex.subtract(1, "day");
      setDayIndex(prevDay);
      if (prevDay.month() !== dayIndex.month()) {
        setMonthIndex(monthIndex - 1);
      } else if (prevDay.week() !== dayIndex.week()) {
        setWeekIndex(weekIndex.subtract(1, "week"));
      }
    }
    setDirection(0);
  }

  function handleNextMonth() {
    if (currentView === "month") {
      setMonthIndex(monthIndex + 1);
      setWeekIndex(weekIndex.add(1, "month").startOf("week"));
    } else if (currentView === "week") {
      let nextWeek = weekIndex.add(1, "week");
      setWeekIndex(nextWeek);
      if (nextWeek.month() !== weekIndex.month()) {
        setMonthIndex(monthIndex + 1);
      }
    } else if (currentView === "day") {
      let nextDay = dayIndex.add(1, "day");
      setDayIndex(nextDay);
      if (dayIndex.month() !== nextDay.month()) {
        setMonthIndex(monthIndex + 1);
      } else if (dayIndex.week() !== nextDay.week()) {
        setWeekIndex(weekIndex.add(1, "week"));
      }
    }
    setDirection(1);
  }

  function handleThisMonth() {
    setMonthIndex(dayjs().month());
    setWeekIndex(dayjs().startOf("week"));
    setTrigger(!trigger);
    setDayIndex(dayjs());
  }

  return (
    <div className="flex flex-row items-center px-1 py-1 border border-gray-300 rounded-md text-gray-600">
      <button onClick={handlePrevMonth}>
        <BsChevronLeft className="cursor-pointer" />
      </button>
      <button onClick={handleThisMonth}>
        <span className="mx-2 cursor-pointer">Today</span>
      </button>
      <button onClick={handleNextMonth}>
        <BsChevronRight className="cursor-pointer" />
      </button>
    </div>
  );
}
