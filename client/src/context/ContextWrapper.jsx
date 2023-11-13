import React, { useEffect, useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";

export default function ContextWrapper({ children }) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [trigger, setTrigger] = useState(false);
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [selectedDate, setSelectedDate] = useState(0);
  const [weekIndex, setWeekIndex] = useState(dayjs());
  const [currentView, setCurrentView] = useState("month");
  const location = useLocation();
  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
      setWeekIndex(dayjs(smallCalendarMonth));
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (location.pathname === "/calendar/weekview") {
      setCurrentView("week");
    } else if (location.pathname === "/calendar/monthview") {
      setCurrentView("month");
    } else if (location.pathname === "/calendar/dayview") {
      setCurrentView("day");
    } else if (location.pathname === "/calendar/yearview") {
      setCurrentView("year");
    }
  }, [location]);

  useEffect(() => {
    console.log(currentView);
  }, [currentView]);
  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        trigger,
        setTrigger,
        smallCalendarMonth,
        setSmallCalendarMonth,
        selectedDate,
        setSelectedDate,
        weekIndex,
        setWeekIndex,
        currentView,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
