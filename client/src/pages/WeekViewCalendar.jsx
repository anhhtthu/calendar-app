import React, { useEffect, useState, useContext } from "react";
import Week from "../components/Week/Week";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getWeek } from "../utils";
import GlobalContext from "../context/GlobalContext";
import { getEvents } from "../services/eventServices";
import dayjs, { utc } from "dayjs";
export default function WeekViewCalendar() {
  const navigate = useNavigate();
  dayjs.extend(utc);
  const { weekIndex, dispatchCalendarEvent } = useContext(GlobalContext);
  const [currentWeek, setCurrentWeek] = useState(getWeek());
  useEffect(() => {
    setCurrentWeek(getWeek(weekIndex));
  }, [weekIndex]);

  useEffect(() => {
    const getWeekEvents = async () => {
      try {
        const startDay = getWeek(weekIndex)[0][0]
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        const endDay = getWeek(weekIndex)[23][6]
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        console.log("startDay", startDay);
        console.log("endDay", endDay);
        console.log("current week", currentWeek);
        const response = await getEvents(startDay, endDay, navigate);
        if (response) {
          dispatchCalendarEvent({
            type: "INITIAL_EVENT",
            payload: response.data,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getWeekEvents();
  }, [currentWeek]);

  return (
    <motion.div
      className="h-[89.4%] flex flex-col items-center px-5"
      initial={{ opacity: 0 }} // Start smaller and invisible
      animate={{ opacity: 1 }} // Scale up to the original size and become visible
      exit={{ opacity: 0 }} // Scale down and become invisible when exit
    >
      <Week week={currentWeek} />
    </motion.div>
  );
}
