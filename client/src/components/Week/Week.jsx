import React, { useEffect, useContext, useState } from "react";
import { motion } from "framer-motion";
import { calendarVariants } from "../../animations/calendarVariants";
import GlobalContext from "../../context/GlobalContext";
import HourInDayWeek from "./HourInDayWeek";
import dayjs from "dayjs";
export default function Week(props) {
  const { week } = { ...props };
  const { direction, weekIndex } = useContext(GlobalContext);
  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
    setIsFirstMount(false);
  }, []);

  function isToday(day) {
    const format = "DD-MM-YYYY";
    const today = dayjs().format(format);
    const currentDay = day.format(format);
    if (today === currentDay) {
      return "text-violet-600";
    } else {
      return "text-gray-500";
    }
  }

  useEffect(() => {
    console.log(week);
  }, []);

  return (
    <React.Fragment>
      <div className=" py-2 w-full justify-center grid grid-cols-[1fr,11fr] bg-gray-200 rounded-lg ">
        <div className="grid grid-cols-1 "></div>
        <motion.div
          className="grid grid-cols-7"
          variants={calendarVariants(direction)}
          animate="visible"
          initial={isFirstMount ? "visible" : "hidden"}
          key={weekIndex}
        >
          {week[0].map((hour, index) => (
            <div
              key={index}
              className={`flex gap-2 flex-row justify-center ${isToday(
                hour
              )} items-center border font-semibold text-md`}
            >
              <p className="  text-center">{hour.format("DD")}</p>
              <p className="  text-center">{hour.format("ddd")}</p>
            </div>
          ))}
        </motion.div>
      </div>
      <motion.div
        className="justify-items-center pt-4 grid border mt-5  rounded-lg grid-cols-[1fr,11fr] h-[87%] overflow-auto scrollbar scrollbar-thumb-gray-200 scrollbar-track-gray-100"
        variants={calendarVariants(direction)}
        animate="visible"
        initial={isFirstMount ? "visible" : "hidden"}
        key={weekIndex}
      >
        <div className="grid grid-rows-24  ">
          {Array.from({ length: 24 }, (_, index) => (
            <p
              key={index}
              className="text-md text-gray-400 font-semibold -mt-3 text-center"
            >
              {index}:00
            </p>
          ))}
        </div>
        <div className="grid  grid-cols-7  grid-rows-24">
          {week.map((row, index) => (
            <React.Fragment key={index}>
              {row.map((hour, index) => (
                <HourInDayWeek key={index} hour={hour} />
              ))}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </React.Fragment>
  );
}
