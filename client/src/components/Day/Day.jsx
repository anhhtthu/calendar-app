import React, { useContext, useEffect } from "react";
import dayjs from "dayjs";
import GlobalContext from "../../context/GlobalContext";

export default function Day(props) {
  const { hours } = { ...props };
  const { setDateModal, setShowModal, savedEvents } = useContext(GlobalContext);

  useEffect(() => {
    console.log(savedEvents);
  }, [savedEvents]);

  const handleTimeEvent = (hour) => {
    setDateModal(hour);
  };

  function roundToNearestHour(time) {
    const hour = time.minute() >= 30 ? time.hour() + 1 : time.hour();
    return time.hour(hour).minute(0).second(0).millisecond(0).format("HH:mm");
  }

  return (
    <div>
      <div className="ml-4 flex flex-col mb-4  bg-white">
        <span className="text-xs">{hours[0].format("dddd")}</span>
        <span className="text-4xl font-semibold">{hours[0].format("DD")}</span>
      </div>
      <div className="overflow-auto h-[560px] m-2 border p-3 rounded-md scrollbar scrollbar-thumb-gray-200 scrollbar-track-gray-100">
        {hours.map((hour, index) => (
          <div
            key={index}
            className="border-t text-gray-400 cursor-pointer font-semibold border-gray-200 py-4"
            onClick={() => {
              handleTimeEvent(hour);
              setShowModal(true);
            }}
          >
            <div>
              {hour.format("HH:mm")}
              {savedEvents
                .filter(
                  (event) =>
                  roundToNearestHour(dayjs(event.time)) ===
                    hour.format("HH:mm")
                )
                .map((event, index) => (
                  <div key={index} style={{ backgroundColor: event.label }}>
                    {event.title}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
