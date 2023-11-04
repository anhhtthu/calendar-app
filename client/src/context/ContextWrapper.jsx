import React, { useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

export default function ContextWrapper({ children }) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [trigger, setTrigger] = useState(false);

  return (
    <GlobalContext.Provider
      value={{ monthIndex, setMonthIndex, trigger, setTrigger }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
