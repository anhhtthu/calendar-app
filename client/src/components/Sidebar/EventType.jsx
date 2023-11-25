import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, PlusIcon } from "@heroicons/react/solid";
import GlobalContext from "../../context/GlobalContext";
export default function EventType() {
  const [openInput, setOpenInput] = useState(false);
  const [inputEventType, setInputEventType] = useState("");
  const { eventTypesDispatch, totalEventTypes } =
    React.useContext(GlobalContext);

  //desc: add new event type to eventTypes state
  const handleAddNewEventType = (e) => {
    e.preventDefault();
    eventTypesDispatch({ type: "ADD_EVENT_TYPE", payload: inputEventType });
    setInputEventType("");
  };

  return (
    <div className="w-full pt-5 mt-6 border-t-2 border-violet-100">
      <div className=" w-full  rounded-2xl bg-white ">
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="px-4 flex w-full items-center justify-between rounded-lg py-2 text-left text-sm font-medium text-gray-600 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span>Filter Events</span>
                <div className="flex items-center gap-3">
                  {!openInput && (
                    <PlusIcon
                      className="h-6 w-6 p-1 text-gray-500 hover:bg-gray-200 rounded-full"
                      onClick={() => setOpenInput(true)}
                    />
                  )}
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-gray-500`}
                  />
                </div>
              </Disclosure.Button>

              <Disclosure.Panel className="pb-2 pt-4 text-sm text-gray-500">
                <React.Fragment>
                  {openInput && (
                    <div className="flex items-center w-full justify-around">
                      <input
                        type="text"
                        value={inputEventType}
                        placeholder="Add new event type"
                        onChange={(e) => setInputEventType(e.target.value)}
                        className="p-2 text-gray-500 placeholder:text-gray-400 text-xs w-3/4 border-gray-300 rounded-md"
                      />
                      <div className="w-1/4 flex justify-center">
                        <PlusIcon
                          className=" w-1/2 p-1 text-gray-500 hover:bg-gray-200 rounded-full"
                          onClick={(e) => handleAddNewEventType(e)}
                        />
                      </div>
                    </div>
                  )}
                  <div className="mt-5">
                    {totalEventTypes.eventTypes.map((eventType, index) => (
                      <div key={index} className="flex items-center pb-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 rounded-sm border-gray-400 text-violet-500 focus:outline-none focus:ring-0"
                        />
                        <label className="ml-2 text-gray-500 font-semibold">
                          {eventType}
                        </label>
                      </div>
                    ))}
                  </div>
                </React.Fragment>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
