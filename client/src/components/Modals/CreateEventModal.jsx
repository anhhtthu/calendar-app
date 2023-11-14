import React, { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import GlobalContext from "../../context/GlobalContext";

export default function CreateEventModal() {
  const { setShowModal, dateModal } = useContext(GlobalContext);
  const [title, setTitle] = useState("");
  const currentTime = dateModal.format("HH:mm");
  const currentDate = dateModal.format("YYYY-MM-DD");
  const [chosenTime, setChosenTime] = useState(currentTime);
  const [chosenDate, setChosenDate] = useState(currentDate);

  return (
    <div className="h-screen w-full fixed left-0 flex justify-center items-center backdrop-blur-sm">
      <form className="w-1/4 bg-white rounded-lg shadow-2xl">
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
          </div>
        </main>
        <footer className="p-4 flex flex-col justify-center">
          <button className="flex justify-center items-center gap-1 bg-black text-white rounded-lg p-2">
            <BsCheck className="text-2xl" />
            <span>Create Schedule</span>
          </button>
        </footer>
      </form>
    </div>
  );
}
