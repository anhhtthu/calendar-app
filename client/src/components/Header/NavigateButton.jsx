import React, { useContext, useEffect } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import GlobalContext from "../../context/GlobalContext";
import dayjs from "dayjs";

export default function NavigateButton() {
  const {
    monthIndex,
    setMonthIndex,
    trigger,
    setTrigger,
    setWeekIndex,
    weekIndex,
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
    }
    setDirection(1);
  }

  function handleThisMonth() {
    setMonthIndex(dayjs().month());
    setWeekIndex(dayjs().startOf("week"));
    setTrigger(!trigger);
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
