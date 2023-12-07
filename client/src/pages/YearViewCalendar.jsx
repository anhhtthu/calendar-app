import React, { useEffect, useState, useContext } from "react";
import { getYear } from "../utils";
import Year from "../components/Year/Year";
import { getEvents } from "../services/eventServices";
import { motion } from "framer-motion";
import utc from "dayjs/plugin/utc";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";

export default function YearViewCalendar() {
  dayjs.extend(utc);
  const { yearIndex, dispatchCalendarEvent } = useContext(GlobalContext);
  const [currentYear, setCurrentYear] = useState(getYear());
  useEffect(() => {
    setCurrentYear(getYear(yearIndex));
  }, [yearIndex]);

  useEffect(() => {
    console.log("current year", currentYear);
  }, []);

  useEffect(() => {
    const getYearEvents = async () => {
      try {
        const startDay = currentYear[0][0][0]
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        const endDay = currentYear[11][4][6]
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        const response = await getEvents(startDay, endDay);

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
    getYearEvents();
  }, [currentYear]);
  return (
    <motion.div
    
      className="flex flex-col items-center px-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Year year={currentYear} />
    </motion.div>
  );
}
