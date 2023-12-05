import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import WarningModal from "../components/Modals/WarningModal";
import CreateEventModal from "../components/Modals/CreateEventModal";
import GlobalContext from "../context/GlobalContext";
import { Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { calendarGet } from "../services/calendarService";

export default function Calendar() {
  const {
    showModal,
    isWarning,
    setCheckedLabel,
    setCalendarId,
    eventTypesDispatch,
  } = useContext(GlobalContext);

  useEffect(() => {
    const getCalendar = async () => {
      try {
        const response = await calendarGet();
        if (response) {
          eventTypesDispatch({
            type: "INITIAL_EVENT_TYPE",
            payload: response.data.settings.totalEventTypes,
          });
          setCheckedLabel(response.data.settings.totalEventTypes);
          setCalendarId(response.data.id);
        }
      } catch (error) {
        // console.log(error);
      }
    };
    getCalendar();
  }, []);

  return (
    <React.Fragment>
      {isWarning && <WarningModal />}
      {showModal && <CreateEventModal />}
      <div className="h-screen flex flex-1 ">
        <Sidebar />
        <div className="h-screen flex flex-1 flex-col overflow-x-hidden">
          <Header />
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
}
