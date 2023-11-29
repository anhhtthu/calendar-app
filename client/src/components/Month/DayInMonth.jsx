import React, { useContext } from "react";
import dayjs from "dayjs";
import monthStyles from "./month.module.css";
import GlobalContext from "../../context/GlobalContext";
export default function DayInMonth(props) {
  const { day } = { ...props };
  const { setDateModal, setShowModal } = useContext(GlobalContext);
  function isToday() {
    return dayjs().isSame(day, "day");
  }

  function isInCurrentMonth() {
    return dayjs().isSame(day, "month");
  }

  return (
    <div
      className={`border ${
        isToday() ? monthStyles.today : "border-gray-200"
      } flex flex-col px-2 ${
        isInCurrentMonth() ? "text-black" : "text-gray-500"
      }`}
    >
      <div className="flex">
        <p className="text-md text-gray-500 font-semibold p-1 my-1 text-left">
          {day.format("DD")}
        </p>
        {isToday() && <span className={monthStyles.isToday}></span>}
      </div>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDateModal(day);
          setShowModal(true);
        }}
      ></div>
    </div>
  );
}
