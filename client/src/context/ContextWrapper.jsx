import React, { useEffect, useState, useReducer } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import {
  savedEventsReducer,
  eventTypesReducer,
} from "../Reducers/eventReducer";
import {
  fetchEvents,
  saveCalendarEvents,
  getEvents,
} from "../services/eventServices";

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
  const [isWarning, setIsWarning] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentMonthSmallCalendarIdx, setCurrentMonthSmallCalendarIdx] =
    useState(dayjs());

  const location = useLocation();

  //initialize savedEvents state
  const [savedEvents, dispatchCalendarEvent] = useReducer(
    savedEventsReducer,
    []
  );

  useEffect(() => {
    console.log(typeof yearIndex);
  }, [yearIndex]);

  //create initial value for event type, in case user data is empty
  const initialEventTypes = {
    eventTypes: ["My calendar"],
    selectedEventType: "My calendar",
  };

  //initialize eventTypes state
  const [totalEventTypes, eventTypesDispatch] = useReducer(
    eventTypesReducer,
    initialEventTypes
  );

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

  //initialize eventTypes state when savedEvents is updated
  // useEffect(() => {
  //   if (savedEvents && savedEvents.length > 0) {
  //     eventTypesDispatch({
  //       type: "INITIAL_EVENT_TYPE",
  //       payload: savedEvents.totalEventTypes,
  //     });
  //   }
  // }, [savedEvents]);

  //fetch events from database and initialize savedEvents state
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await getEvents();
        console.log(events);
        if (events.length > 0) {
          dispatchCalendarEvent({
            type: "INITIAL_EVENT",
            payload: events,
          });
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  //purpose: render the loading screen until the todos are fetched from the database
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
