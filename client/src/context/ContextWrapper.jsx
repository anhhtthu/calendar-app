import React, { useEffect, useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

export default function ContextWrapper({ children }) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [trigger, setTrigger] = useState(false);
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [selectedDate, setSelectedDate] = useState(0);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
