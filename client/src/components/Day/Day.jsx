import React, { useEffect } from "react";
import dayjs from "dayjs";

export default function Day(props) {
  const { hours } = { ...props };
  useEffect(() => {
    console.log("hours object", hours);
  }, []);

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
            className="border-t text-gray-400 font-semibold border-gray-200 py-4"
          >
            <div> {hour.format("HH:mm")} </div>
          </div>
        ))}
      </div>
    </div>
  );
}
