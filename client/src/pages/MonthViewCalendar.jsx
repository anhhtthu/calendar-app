import React from "react";
import Month from "../components/Month/Month";
import WeekBar from "../components/WeekBar";
import { useState, useEffect, useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import { getMonth } from "../utils/index";
import { getEvents } from "../services/eventServices";
import { motion } from "framer-motion";
import dayjs, { utc } from "dayjs";
import { useNavigate } from "react-router-dom";

export default function MonthViewCalendar() {
  dayjs.extend(utc);
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, dispatchCalendarEvent } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));

    const getWeekEvents = async () => {
      try {
        const startDay = getMonth(monthIndex)[0][0]
          .startOf("month")
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        const endDay = getMonth(monthIndex)[4][6]
          .endOf("month")
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

        const response = await getEvents(startDay, endDay, navigate);
        if (response) {
          dispatchCalendarEvent({
            type: "INITIAL_EVENT",
            payload: response.data,
          });
        }
      } catch (error) {}
    };
    getWeekEvents();
  }, [monthIndex, navigate, dispatchCalendarEvent]);

  return (
    <motion.div
      className="flex flex-1 flex-col px-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <WeekBar />
      <Month month={currentMonth} />
    </motion.div>
  );
}
