import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Calendar from "./pages/Calendar";
import MonthViewCalendar from "./pages/MonthViewCalendar";
import WeekViewCalendar from "./pages/WeekViewCalendar";
import React from "react";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/calendar" element={<Calendar />}>
        <Route index element={<Navigate to="monthview" replace />} />
        <Route path="monthview" element={<MonthViewCalendar />} />
        <Route path="weekview" element={<WeekViewCalendar />} />
      </Route>
    </Routes>
  );
}

export default App;
