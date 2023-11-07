import React from "react";

export default function HourInDayWeek(props) {
  const { hour } = { ...props };
  return (
    <div className="border-t border-gray-200 flex flex-row px-2">
      <p className="invisible text-md text-gray-500 font-semibold p-1 my-1 text-left">
        {hour.format("dddd, MMMM D")}
      </p>
    </div>
  );
}
