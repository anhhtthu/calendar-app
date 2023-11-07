import React, { useEffect, useState, useContext } from "react";
import Week from "../components/Week/Week";
import { getWeek } from "../utils";
import GlobalContext from "../context/GlobalContext";
export default function WeekViewCalendar() {
  const { weekIndex } = useContext(GlobalContext);
  const [currentWeek, setCurrentWeek] = useState(getWeek());
  useEffect(() => {
    setCurrentWeek(getWeek(weekIndex));
  }, [weekIndex]);

  return (
    <div className="h-[89.4%] flex flex-col items-center px-5">
      <Week week={currentWeek} />
    </div>
  );
}
