import React, { useContext, useState, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modalVariants } from "../../animations/modalVariants";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import GlobalContext from "../../context/GlobalContext";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { saveCalendarEvents } from "../../services/eventServices";

export default function CreateEventModal() {
  const {
    showModal,
    setShowModal,
    dateModal,
    savedEvents,
    dispatchCalendarEvent,
    totalEventTypes,
    eventTypesDispatch,
  } = useContext(GlobalContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const currentTime = dateModal.format("HH:mm");
  const currentDate = dateModal.format("YYYY-MM-DD");
  const [chosenTime, setChosenTime] = useState(currentTime);
  const [chosenDate, setChosenDate] = useState(currentDate);
  const labelClasses = ["indigo", "gray", "green", "blue", "rose", "purple"];
  const [selectedLabel, setSelectedLabel] = useState(labelClasses[0]);

  //desc: handle submit event
  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      title,
      description,
      date: chosenDate,
      time: chosenTime,
      label: selectedLabel,
      totalEventTypes,
    };
    saveCalendarEvents([...savedEvents, newEvent]);
    console.log(newEvent);
    dispatchCalendarEvent({ type: "ADD_EVENT", payload: newEvent });
    setShowModal(false);
  };

  //desc: handle selected event type
  const handleSelectedEventType = (eventType) => {
    eventTypesDispatch({ type: "SELECTED_EVENT_TYPE", payload: eventType });
  };

  //desc: merge multiple classes into one if the option is active
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="h-screen w-full fixed left-0 flex justify-center items-center backdrop-blur-sm"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <form
            className="w-1/3 bg-white rounded-lg shadow-2xl"
            onSubmit={(e) => handleSubmit(e)}
          >
            <header className="px-4 py-2 mt-3 flex justify-between items-center">
              <div className="flex flex-col items-start">
                <span className="text-lg font-semibold text-gray-500">
                  Create Schedule
                </span>
                <span className="text-gray-500 text-sm">
                  You can create event, meeting and tasks
                </span>
              </div>
              <button onClick={() => setShowModal(false)}>
                <AiOutlineClose className="text-gray-400 text-xl" />
              </button>
            </header>
            <main className="p-4 text-gray-500">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="title">Title</label>
                  <input
                    placeholder="Add title"
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="description">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Event Description"
                    className="border border-gray-300 rounded-md p-2"
                  ></textarea>
                </div>
                <div className="flex flex-1 gap-4 justify-between">
                  <div className="flex flex-col gap-2 w-1/2">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      value={chosenDate}
                      onChange={(e) => setChosenDate(e.target.value)}
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-1/2">
                    <label htmlFor="time">Time</label>
                    <input
                      type="time"
                      value={chosenTime}
                      onChange={(e) => setChosenTime(e.target.value)}
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-1">
                  <Menu
                    as="div"
                    className="flex gap-3 relative justify-between items-center"
                  >
                    <label htmlFor="">Choose your event type</label>
                    <div className="w-1/2">
                      <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2  text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        {totalEventTypes.selectedEventType
                          ? totalEventTypes.selectedEventType
                          : "Select your event type"}
                        <ChevronDownIcon
                          className="-mr-1 h-5 w-5 text-gray-400 mt-1"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute top-8 right-0 z-10 mt-2 w-1/2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {totalEventTypes?.eventTypes?.map(
                          (eventType, index) => (
                            <Menu.Item key={index}>
                              {({ active }) => (
                                <span
                                  onClick={() =>
                                    handleSelectedEventType(eventType)
                                  }
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2"
                                  )}
                                >
                                  {eventType}
                                </span>
                              )}
                            </Menu.Item>
                          )
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="flex mt-3 flex-row justify-between gap-x-2">
                  <label htmlFor="label">Choose your label color</label>
                  <div className="flex gap-2">
                    {labelClasses.map((label, index) => (
                      <span
                        onClick={() => setSelectedLabel(label)}
                        className={`bg-${label}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                        key={index}
                      >
                        {selectedLabel === label && (
                          <BsCheck className="text-white" />
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </main>
            <footer className="p-4 flex flex-col justify-center">
              <button
                type="submit"
                className="flex justify-center items-center gap-1 bg-black text-white rounded-lg p-2"
              >
                <BsCheck className="text-2xl" />
                <span>Create Schedule</span>
              </button>
            </footer>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
