import React, { useEffect } from "react";
import dayjs from "dayjs";
import GlobalContext from "../../context/GlobalContext";

export default function SelectedTimeDisplay() {
  const { monthIndex } = React.useContext(GlobalContext);
  useEffect(() => {
    console.log("monthIndex", monthIndex);
  }, [monthIndex]);
  return (
    <h2 className="text-gray-500 font-bold text-l">
      {dayjs(monthIndex).format("MMMM YYYY")}
    </h2>
  );
}
