import React from "react";
import { BsCalendarPlus } from "react-icons/bs";
import NavigateButton from "./NavigateButton";
import AddEventButton from "./AddEventButton";
import CalendarViewSwitcher from "./CalendarViewSwitcher";

export default function Header() {
  return (
    <div className="flex justify-between py-4 items-center">
      <BsCalendarPlus />
      <CalendarViewSwitcher />
      <div className="flex flex-rows">
        <NavigateButton />
        <AddEventButton />
      </div>
    </div>
  );
}
