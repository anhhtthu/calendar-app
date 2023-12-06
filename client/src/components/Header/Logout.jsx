import React from "react";
import { CiLogin } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ROUTES } from "../../constant/apiPath";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(ROUTES.AUTH.BASE + ROUTES.AUTH.LOGOUT);

      sessionStorage.removeItem("accessToken");

      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="flex px-2 py-2 gap-2 border border-gray-300 cursor-pointer hover:bg-gray-200 rounded-md flex-row justify-center items-center">
      <CiLogin className="text-2xl text-gray-500" />
      <button
        onClick={handleLogout}
        className="px-1 text-md text-gray-600 focus:outline-none focus:border-black"
      >
        Logout
      </button>
    </div>
  );
}
