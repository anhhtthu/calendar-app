import React, { useEffect, useState, useReducer } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import {
  savedEventsReducer,
  eventTypesReducer,
} from "../Reducers/eventReducer";
import { fetchEvents, saveCalendarEvents } from "../services/eventServices";

export default function ContextWrapper({ children }) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [trigger, setTrigger] = useState(false);
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [selectedDate, setSelectedDate] = useState(0);
  const [dateModal, setDateModal] = useState(dayjs());
  const [weekIndex, setWeekIndex] = useState(dayjs());
  const [currentView, setCurrentView] = useState("month");
  const [showModal, setShowModal] = useState(false);
  const [direction, setDirection] = useState(0);
  const location = useLocation();

  //initialize savedEvents state
  const [savedEvents, dispatchCalendarEvent] = useReducer(
    savedEventsReducer,
    []
  );

  //create initial value for event type, in case user data is empty
  const initialEventTypes = {
    eventTypes: [],
    selectedEventType: null,
  };

  //initialize eventTypes state
  const [totalEventTypes, eventTypesDispatch] = useReducer(
    eventTypesReducer,
    initialEventTypes
  );

  //fetch events from database and initialize savedEvents state
  useEffect(() => {
    const initialEvents = fetchEvents();
    dispatchCalendarEvent({ type: "INITIAL_EVENT", payload: initialEvents });
  }, []);

  //update savedEvents state when savedEvents is updated
  useEffect(() => {
    saveCalendarEvents(savedEvents);
  }, [savedEvents]);

  //set monthIndex to smallCalendarMonth when smallCalendarMonth is updated
  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
      setWeekIndex(dayjs(smallCalendarMonth));
    }
  }, [smallCalendarMonth]);

  //define current view of calendar to toggle next/prev buttons
  useEffect(() => {
    if (location.pathname === "/calendar/weekview") {
      setCurrentView("week");
    } else if (location.pathname === "/calendar/monthview") {
      setCurrentView("month");
    } else if (location.pathname === "/calendar/dayview") {
      setCurrentView("day");
    } else if (location.pathname === "/calendar/yearview") {
      setCurrentView("year");
    }
  }, [location]);

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        trigger,
        setTrigger,
        smallCalendarMonth,
        setSmallCalendarMonth,
        selectedDate,
        setSelectedDate,
        weekIndex,
        setWeekIndex,
        currentView,
        showModal,
        setShowModal,
        dateModal,
        setDateModal,
        setDirection,
        direction,
        dispatchCalendarEvent,
        savedEvents,
        totalEventTypes,
        eventTypesDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
