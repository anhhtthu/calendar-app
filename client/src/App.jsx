import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Calendar from "./pages/Calendar";
import MonthViewCalendar from "./pages/MonthViewCalendar";
import WeekViewCalendar from "./pages/WeekViewCalendar";
import DayViewCalendar from "./pages/DayViewCalendar";
import YearViewCalendar from "./pages/YearViewCalendar";
import React from "react";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/register" element={<Register />} />
      <Route path="/calendar" element={<Calendar />}>
        <Route index element={<Navigate to="monthview" replace />} />
        <Route path="monthview" element={<MonthViewCalendar />} />
        <Route path="weekview" element={<WeekViewCalendar />} />
        <Route path="dayview" element={<DayViewCalendar />} />
        <Route path="yearview" element={<YearViewCalendar />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
