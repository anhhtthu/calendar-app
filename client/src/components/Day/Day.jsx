import React, { useContext, useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import GlobalContext from "../../context/GlobalContext";

export default function Day(props) {
  const { hours } = { ...props };
  const [dayEvents, setDayEvents] = useState([]);
  const [rowHeight, setRowHeight] = useState(0);
  const { setDateModal, setShowModal, savedEvents, setSelectedEvent } =
    useContext(GlobalContext);
  const rowRef = useRef(null);

  useEffect(() => {
    if (rowRef.current) {
      const height = rowRef.current.getBoundingClientRect().height;
      setRowHeight(height);
    }
  }, []);

  useEffect(() => {
    const events = savedEvents.filter(
      (event) =>
        dayjs(event.date).format("DD-MM-YY") === hours[0].format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [savedEvents, hours]);

  useEffect(() => {
    console.log("dayEvent", dayEvents);
  }, [dayEvents]);

  //set the date for the created event when click to a specific hour in the calendar
  const handleTimeEvent = (hour) => {
    setDateModal(hour);
  };

  return (
    <div>
      <div className="ml-4 flex flex-col mb-4  bg-white">
        <span className="text-xs">{hours[0].format("dddd")}</span>
        <span className="text-4xl font-semibold">{hours[0].format("DD")}</span>
      </div>
      <div className=" gap-2 relative overflow-auto h-[560px] m-2 border px-4 rounded-md scrollbar scrollbar-thumb-gray-200 scrollbar-track-gray-100">
        {hours.map((hour, index) => (
          <div
            key={index}
            ref={index === 0 ? rowRef : null}
            className="border-t flex items-center text-gray-400 h-16 cursor-pointer font-semibold border-gray-200"
            onClick={() => {
              handleTimeEvent(hour);
              setShowModal(true);
            }}
          >
            <div>{hour.format("HH:mm")}</div>
            {dayEvents.map((event, index) => {
              const startRow = event.startTime.hour();
              const endRow = event.endTime.hour();
              const span = endRow - startRow;
              console.log(startRow, endRow);

              return (
                <div
                  onClick={() => setSelectedEvent(event)}
                  key={index}
                  className={`bg-${event.label}-200 ml-20 z-10 w-11/12 absolute p-2 mr-3 cursor-pointer text-gray-500 rounded-md border border-white mb-1 truncate`}
                  style={{
                    top: `${startRow * rowHeight}px`,
                    height: `${span * rowHeight}px`,
                  }}
                >
                  <p className="text-sm font-semibold">{event.title}</p>
                  <p className="text-xs mt-1">{` ${event.startTime.format(
                    "HH:mm"
                  )} - ${event.endTime.format("HH:mm")}`}</p>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
