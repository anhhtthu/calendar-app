import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import dayjs from "dayjs";

export default function HourInDayWeek(props) {
  const { setDateModal, setShowModal, setselectedEvent, savedEvents } =
    useContext(GlobalContext);
  const { hour } = { ...props };
  const [weekEvents, setWeekEvents] = useState([]);

  useEffect(() => {
    const event = savedEvents.filter(
      (event) =>
        dayjs(event.date).format("DD-MM-YY") === hour.format("DD-MM-YY") &&
        dayjs(event.startTime).format("HH:mm")
    );
  });

  const handleTimeEvent = (hour) => {
    setDateModal(hour);
  };

  return (
    <div
      className="border-t border-gray-200 flex flex-row px-2 cursor-pointer"
      onClick={() => {
        handleTimeEvent(hour);
        setShowModal(true);
      }}
    >
      <p className="invisible text-md text-gray-500 font-semibold p-1 my-1 text-left">
        {hour.format("dddd, MMMM D")}
      </p>
    </div>
  );
}
