import React from "react";
import DayInMonth from "./DayInMonth";

export default function Month(props) {
  const { month } = { ...props };
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {month.map((row, idx) => (
        <React.Fragment key={idx}>
          {row.map((day, idx) => (
            <DayInMonth day={day} key={idx} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
