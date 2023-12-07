import React, { useContext, useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import GlobalContext from "../../context/GlobalContext";
import { motion } from "framer-motion";

export default function Day(props) {
  dayjs.extend(utc);
  const { hours } = { ...props };
  const [dayEvents, setDayEvents] = useState([]);
  const [widthEvents, setWidthEvents] = useState({});
  const [rowHeight, setRowHeight] = useState(0);
  const {
    setDateModal,
    setShowModal,
    savedEvents,
    setSelectedEvent,
    isDisplayEvent,
    setIsDisplayEvent,
  } = useContext(GlobalContext);
  const rowRef = useRef(null);

  //desc: get the height of each row in the calendar to calculate the height of the event display
  useEffect(() => {
    if (rowRef.current) {
      const height = rowRef.current.getBoundingClientRect().height;
      setRowHeight(height);
    }
  }, []);

  //desc: filter events which match with the days in calendar, to place the event in the right row
  useEffect(() => {
    const events = savedEvents
      .filter(
        (event) =>
          dayjs(event.date).format("DD-MM-YY") === hours[0].format("DD-MM-YY")
      )
      .map((event) => {
        const startRow = dayjs(event.startTime).local().hour();
        const endRow = dayjs(event.endTime).local().hour();
        const span = endRow - startRow;

        return { ...event, startRow, endRow, span };
      });
    setDayEvents(events);
  }, [savedEvents, hours]);

  //set the date for the created event when click to a specific hour in the calendar
  const handleTimeEvent = (hour) => {
    setDateModal(hour);
  };

  //desc: check if the event overlap with other events
  function checkOverlap(event1, event2) {
    const startEvent1 = dayjs.utc(event1.startTime).local().hour();
    const startEvent2 = dayjs.utc(event2.startTime).local().hour();
    const endEvent1 = dayjs.utc(event1.endTime).local().hour();
    const endEvent2 = dayjs.utc(event2.endTime).local().hour();
    const overlap = startEvent1 < endEvent2 && startEvent2 < endEvent1;

    return overlap;
  }

  const newWidths = useRef(new Map());

  //desc: count the number of overlap events to set the width of the event
  function countOverlap() {
    // if (isDisplayEvent) {
    let newEvents = [...dayEvents]; // create a copy of dayEvents

    while (newEvents.length > 0) {
      const event = newEvents[0]; // get the first event

      const numberOfOverlap = newEvents.filter(
        (otherEvent) =>
          otherEvent.id !== event.id && checkOverlap(event, otherEvent)
      ).length;

      let eventWidth;
      switch (numberOfOverlap) {
        case 0:
          eventWidth = "w-11/12 z-[14]";
          break;
        case 1:
          eventWidth = "w-9/12 z-[15]";
          break;
        case 2:
          eventWidth = "w-7/12 z-[16]";
          break;
        case 3:
          eventWidth = "w-5/12 z-[17]";
          break;
        case 4:
          eventWidth = "w-3/12 z-[18]";
          break;
        default:
          eventWidth = "w-1/12 z-[20]";
          break;
      }

      newWidths.current.set(event.id, eventWidth);

      newEvents = newEvents.filter((e) => e.id !== event.id); // remove the event from newEvents
    }

    setWidthEvents(new Map(newWidths.current));
  }

  useEffect(() => {
    console.log("widthEvents", widthEvents);
  }, [widthEvents]);

  useEffect(() => {
    countOverlap();
    console.log("is running");
  }, [dayEvents]);

  // useEffect(() => {
  //   if (dayEvents.some((event) => !event.width)) {
  //     setDayEvents(dayEvents.map((event) => countOverlap(event, dayEvents)));
  //   }
  // }, [dayEvents]);

  return (
    <motion.div layout>
      <div className="ml-4 flex flex-col mb-4  bg-white">
        <span className="text-xs">{hours[0].format("dddd")}</span>
        <span className="text-4xl font-semibold">{hours[0].format("DD")}</span>
      </div>
      <div className=" gap-2 relative overflow-auto max-h-[75vh] m-2 border px-4 rounded-md scrollbar scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100">
        {hours.map((hour, index) => (
          <div
            key={index}
            ref={index === 0 ? rowRef : null}
            className="border-t flex items-center text-gray-400 h-16 cursor-pointer font-semibold border-gray-200"
            onClick={() => {
              handleTimeEvent(hour);
              setShowModal(true);
            }}
          >
            <div>{hour.format("HH:mm")}</div>
            <div className="flex flex-row justify-end w-full">
              {dayEvents.map((event, index) => {
                const { startRow, endRow, span } = event;

                // const overlapEvents = countOverlap(event, dayEvents);
                // console.log("overlapEvents", overlapEvents);

                // event.width = eventWidth;
                // console.log(event.title, countOverlap(event, dayEvents));
                return (
                  <div
                    onClick={() => setSelectedEvent(event)}
                    key={index}
                    className={`bg-${
                      event.color
                    }-200 ml-20 z-10 ${widthEvents.get(
                      event.id
                    )} absolute p-2 mr-2 cursor-pointer text-gray-500 rounded-md border border-white mb-1 truncate`}
                    style={{
                      top: `${startRow * rowHeight}px`,
                      height: `${span * rowHeight}px`,
                    }}
                  >
                    <p className="text-sm font-semibold">{event.title}</p>
                    <p className="text-xs mt-1">{` ${dayjs
                      .utc(event.startTime)
                      .local()
                      .format("HH:mm")} - ${dayjs
                      .utc(event.endTime)
                      .local()
                      .format("HH:mm")}`}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
