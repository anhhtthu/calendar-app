import React from "react";
import NavigateButton from "./NavigateButton";
import AddEventButton from "./AddEventButton";
import CalendarViewSwitcher from "./CalendarViewSwitcher";
import SelectedTimeDisplay from "./SelectedTimeDisplay";
import Logout from "./Logout";

export default function Header() {
  return (
    <div className="flex h-1/12 justify-between px-5 py-3 mb-5 items-center border-b">
      <div className="w-1/3 flex justify-start">
        <SelectedTimeDisplay />
      </div>
      <div className="w-1/3 text-center">
        <CalendarViewSwitcher />
      </div>
      <div className="w-1/3 flex justify-end gap-4">
        <NavigateButton />
        <AddEventButton />
        <Logout />
      </div>
    </div>
  );
}
