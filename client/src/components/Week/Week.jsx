import React, { useEffect } from "react";
import HourInDayWeek from "./HourInDayWeek";
import dayjs from "dayjs";
export default function Week(props) {
  const { week } = { ...props };

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

  return (
    <React.Fragment>
      <div className=" py-2 w-full justify-center grid grid-cols-[1fr,11fr] bg-gray-200 rounded-lg ">
        <div className="grid grid-cols-1 "></div>
        <div className="grid grid-cols-7">
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
        </div>
      </div>
      <div className="justify-items-center pt-4 grid border mt-5  rounded-lg grid-cols-[1fr,11fr] h-[87%] overflow-auto scrollbar scrollbar-thumb-gray-200 scrollbar-track-gray-100">
        <div className="grid grid-rows-24  ">
          {Array.from({ length: 24 }, (_, index) => (
            <p
              key={index}
              className="text-md text-gray-400 font-semibold -mt-3 text-center"
            >
              {index + 1}:00
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
      </div>
    </React.Fragment>
  );
}
