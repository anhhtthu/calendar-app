import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},
  weekIndex: 0,
  setWeekIndex: (index) => {},
  smallCalendarMonth: 0,
  setSmallCalendarMonth: (index) => {},
  selectedDate: 0,
  setSelectedDate: (index) => {},
});

export default GlobalContext;
