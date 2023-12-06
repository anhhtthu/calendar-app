import React from "react";
import { CiLogin } from "react-icons/ci";

export default function Logout() {
  return (
    <div className="flex px-2 py-2 gap-2 border border-gray-300 cursor-pointer hover:bg-gray-200 rounded-md flex-row justify-center items-center">
      <CiLogin className="text-2xl text-gray-500" />
      <p className="text-gray-500 font-semibold">Logout</p>
    </div>
  );
}
