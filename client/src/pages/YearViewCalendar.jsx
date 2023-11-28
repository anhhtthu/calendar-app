import React, { useEffect } from "react";
import { getYear } from "../utils";
import Year from "../components/Year/Year";

export default function YearViewCalendar() {
  const year = getYear();

  return (
    <div className="flex flex-col items-center px-5">
      <Year year={year} />
    </div>
  );
}
