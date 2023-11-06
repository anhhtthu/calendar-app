import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Calendar from "./pages/Calendar";
import MonthViewCalendar from "./pages/MonthViewCalendar";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/calendar" element={<Calendar />}>
        <Route path="" element={<MonthViewCalendar />} />
      </Route>
    </Routes>
  );
}

export default App;
