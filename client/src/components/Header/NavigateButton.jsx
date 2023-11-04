import React, { useContext } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import GlobalContext from "../../context/GlobalContext";
import dayjs from "dayjs";

export default function NavigateButton() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  function handleThisMonth() {
    setMonthIndex(dayjs().month());
  }

  return (
    <div className="flex flex-row items-center px-3 py-1 border rounded text-gray-600">
      <BsChevronLeft className="cursor-pointer" onClick={handlePrevMonth} />
      <span className="mx-2 cursor-pointer" onClick={handleThisMonth}>
        Today
      </span>
      <BsChevronRight className="cursor-pointer" onClick={handleNextMonth} />
    </div>
  );
}
