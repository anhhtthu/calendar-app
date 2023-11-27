import React, { useContext, useState, useEffect } from "react";
import { getDay } from "../utils";
import GlobalContext from "../context/GlobalContext";
import Day from "../components/Day/Day";

export default function DayViewCalendar() {
  const [currentDay, setCurrentDay] = useState(getDay());
  const { dayIndex } = useContext(GlobalContext);
  useEffect(() => {
    setCurrentDay(getDay(dayIndex));
  }, [dayIndex]);

  return (
    <div className="flex flex-1 flex-col px-5">
      <Day hours={currentDay} />
    </div>
  );
}
