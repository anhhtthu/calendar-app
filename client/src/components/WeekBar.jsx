import React from "react";

export default function WeekBar() {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className="grid grid-cols-7">
      {daysOfWeek.map((day, index) => (
        <div key={index} className="border border-gray-200 flex flex-col">
          <header className="flex flex-col">
            <p className="text-sm mt-1">{day.toUpperCase().substring(0, 3)}</p>
          </header>
        </div>
      ))}
    </div>
  );
}
