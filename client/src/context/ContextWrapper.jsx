import React, { useEffect, useState, useReducer } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import {
  savedEventsReducer,
  eventTypesReducer,
} from "../Reducers/eventReducer";

export default function ContextWrapper({ children }) {
  const [monthIndex, setMonthIndex] = useState(dayjs());
  const [trigger, setTrigger] = useState(false);
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [selectedDate, setSelectedDate] = useState(0);
  const [dateModal, setDateModal] = useState(dayjs());
  const [weekIndex, setWeekIndex] = useState(dayjs());
  const [dayIndex, setDayIndex] = useState(dayjs());
  const [yearIndex, setYearIndex] = useState(dayjs().year());
  const [currentView, setCurrentView] = useState("month");
  const [showModal, setShowModal] = useState(false);
  const [direction, setDirection] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isDisplayEvent, setIsDisplayEvent] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [calendarId, setCalendarId] = useState(null);
  // const [eventType, setEventType] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentMonthSmallCalendarIdx, setCurrentMonthSmallCalendarIdx] =
    useState(dayjs());

  const location = useLocation();

  //initialize eventTypes state
  const [totalEventTypes, eventTypesDispatch] = useReducer(eventTypesReducer, [
    "My calendar",
  ]);

  const [checkedLabel, setCheckedLabel] = useState(totalEventTypes);

  useEffect(() => {
    console.log("checkedLabel", checkedLabel);
  }, [checkedLabel]);

  //initialize savedEvents state
  const [savedEvents, dispatchCalendarEvent] = useReducer(
    savedEventsReducer,
    []
  );

  const [filteredEvents, setFilteredEvents] = useState([]);

  //filter savedEvents state based on checkedLabel
  useEffect(() => {
    setFilteredEvents(
      savedEvents.filter((event) => checkedLabel.includes(event.eventType))
    );
  }, [checkedLabel, savedEvents]);

  console.log("filteredEvents", filteredEvents);
  console.log("savedEvents", savedEvents);

  //update savedEvents state when savedEvents is updated

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

  useEffect(() => {
    console.log("savedEvent after fetch from server", savedEvents);
  }, [totalEventTypes]);

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
        savedEvents: filteredEvents,
        totalEventTypes,
        eventTypesDispatch,
        isWarning,
        setIsWarning,
        dayIndex,
        setDayIndex,
        yearIndex,
        setYearIndex,
        setSelectedEvent,
        selectedEvent,
        currentMonthSmallCalendarIdx,
        setCurrentMonthSmallCalendarIdx,
        setCheckedLabel,
        checkedLabel,
        calendarId,
        setIsDisplayEvent,
        setCalendarId,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
