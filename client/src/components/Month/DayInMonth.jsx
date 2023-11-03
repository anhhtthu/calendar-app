import React from "react";
export default function DayInMonth(props) {
  const { day } = { ...props };
  return (
    <div className="border border-gray-200 flex flex-col">
      <p className="text-sm p-1 my-1 text-left">{day.format("DD")}</p>
    </div>
  );
}
