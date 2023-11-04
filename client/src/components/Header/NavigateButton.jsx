import React, { useContext } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import GlobalContext from "../../context/GlobalContext";
import dayjs from "dayjs";

export default function NavigateButton() {
  const { monthIndex, setMonthIndex, trigger, setTrigger } =
    useContext(GlobalContext);

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  function handleThisMonth() {
    setMonthIndex(dayjs().month());
    setTrigger(!trigger);
  }

  return (
    <div className="flex flex-row items-center px-3 py-1 border rounded text-gray-600">
      <button onClick={handlePrevMonth}>
        <BsChevronLeft className="cursor-pointer" />
      </button>
      <button onClick={handleThisMonth}>
        <span className="mx-2 cursor-pointer">Today</span>
      </button>
      <button onClick={handleNextMonth}>
        <BsChevronRight className="cursor-pointer" />
      </button>
    </div>
  );
}
