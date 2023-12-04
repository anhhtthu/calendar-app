import "./App.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Calendar from "./pages/Calendar";
import MonthViewCalendar from "./pages/MonthViewCalendar";
import WeekViewCalendar from "./pages/WeekViewCalendar";
import DayViewCalendar from "./pages/DayViewCalendar";
import YearViewCalendar from "./pages/YearViewCalendar";
import UserProfile from "./pages/UserProfile";
import ChangePassword from "./pages/ChangePassword";
import React from "react";

function App() {
  const location = useLocation();
  return (
<<<<<<< HEAD
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/userprofile" element={<UserProfile />} />
      <Route path="/changepassword" element={<ChangePassword />} />
      <Route path="/calendar" element={<Calendar />}>
        <Route index element={<Navigate to="monthview" replace />} />
        <Route path="monthview" element={<MonthViewCalendar />} />
        <Route path="weekview" element={<WeekViewCalendar />} />
        <Route path="dayview" element={<DayViewCalendar />} />
        <Route path="yearview" element={<YearViewCalendar />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
=======
    <AnimatePresence wait>
      <Routes location={location} key={location.key}>
        <Route path="/login" element={<Login />} />
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
    </AnimatePresence>
>>>>>>> c0aea91e50fd967ec1bf9035760b17b1367063ea
  );
}

export default App;
