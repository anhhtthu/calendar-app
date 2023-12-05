import React, { useContext, useState, useEffect } from "react";
import { getDay } from "../utils";
import { motion } from "framer-motion";
import GlobalContext from "../context/GlobalContext";
import { getEvents } from "../services/eventServices";
import Day from "../components/Day/Day";

export default function DayViewCalendar() {
  const [currentDay, setCurrentDay] = useState(getDay());
  const { dayIndex, setIsDisplayEvent, dispatchCalendarEvent } =
    useContext(GlobalContext);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        if (response) {
          dispatchCalendarEvent({
            type: "INITIAL_EVENTS",
            payload: response.data,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    setCurrentDay(getDay(dayIndex));
    setIsDisplayEvent(true);
    return () => {
      setIsDisplayEvent(false);
    };
  }, [dayIndex]);

  return (
    <motion.div
      className="flex flex-1 flex-col px-5 "
      initial={{ opacity: 0 }} // Start smaller and invisible
      animate={{ opacity: 1 }} // Scale up to the original size and become visible
      exit={{ opacity: 0 }} // Scale down and become invisible when exit
    >
      <Day hours={currentDay} />
    </motion.div>
  );
}
