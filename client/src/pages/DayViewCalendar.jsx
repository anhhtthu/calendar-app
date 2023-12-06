import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDay } from "../utils";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import GlobalContext from "../context/GlobalContext";
import { getEvents } from "../services/eventServices";
import Day from "../components/Day/Day";

export default function DayViewCalendar() {
  const navigate = useNavigate();
  dayjs.extend(utc);
  const [currentDay, setCurrentDay] = useState(getDay());
  const { dayIndex, dispatchCalendarEvent } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentDay(getDay(dayIndex));
  }, [dayIndex]);

  useEffect(() => {}, [currentDay]);

  useEffect(() => {
    const currentStartDayjs = currentDay[0];
    const currentEndDayjs = currentDay[23];
    const currentStartDayString = currentStartDayjs
      .utc()
      .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    const currentEndDayString = currentEndDayjs
      .utc()
      .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    console.log("currentDay dayjs", currentDay);
    console.log("currentDay", currentStartDayString, currentEndDayString);
    const fetchEvents = async () => {
      try {
        const response = await getEvents(
          currentStartDayString,
          currentEndDayString,
          navigate
        );
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
    fetchEvents();
  }, [currentDay]);

  return (
    <motion.div
      className="flex flex-1 flex-col px-5 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Day hours={currentDay} />
    </motion.div>
  );
}
