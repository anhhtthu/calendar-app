import React from "react";

export default function CalendarViewSwitcher() {
  return (
    <div className="flex gap-5 text-gray-600">
      <button>Day</button>
      <button>Week</button>
      <button>Month</button>
      <button>Year</button>
    </div>
  );
}
