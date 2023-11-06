import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import { Route, Routes, Outlet } from "react-router-dom";

export default function Calendar() {
  return (
    <div className="h-screen flex flex-1">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
