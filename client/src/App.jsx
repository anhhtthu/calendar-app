import "./App.css";
import { getMonth } from "./utils/index";
import { useState } from "react";
import Header from "./components/Header/Header";
import Month from "./components/Month/Month";
import Sidebar from "./components/Sidebar/Sidebar";
import WeekBar from "./components/WeekBar";

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  return (
    <div className="App">
      <div className="h-screen flex flex-columns">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex flex-1 flex-col">
            <WeekBar />
            <Month month={currentMonth} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
