import React from "react";
import NavigateButton from "./NavigateButton";
import AddEventButton from "./AddEventButton";
import CalendarViewSwitcher from "./CalendarViewSwitcher";
import SelectedTimeDisplay from "./SelectedTimeDisplay";

export default function Header() {
  return (
    <div className="flex justify-between p-4 items-center">
      <div className="w-1/3 flex justify-start">
        <SelectedTimeDisplay />
      </div>
      <div className="w-1/3 text-center">
        <CalendarViewSwitcher />
      </div>
      <div className="w-1/3 flex justify-end">
        <NavigateButton />
        <AddEventButton />
      </div>
    </div>
  );
}
