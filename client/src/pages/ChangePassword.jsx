import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";  
import axios from "axios";

export default function ChangePassword() {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/api/v1/users/update-password", passwordData);
      console.log("Password updated successfully");
    } catch (error) {
      console.error("Failed to update password", error);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen pb-24">
    <header className="px-6 bg-white flex flex-wrap items-center lg:py-0 py-2">
      <div className="flex-1 flex justify-between items-center font-black text-gray-700">
        <a href="#">LOGO</a>
      </div>
      <label htmlFor="menu-toggle" className="cursor-pointer lg:hidden block">
      </label>
      <input className="hidden" type="checkbox" id="menu-toggle" />
      <div className="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
        <nav>
          <ul className="lg:flex items-center justify-between text-sm font-medium text-gray-700 pt-4 lg:pt-0">
            <li><a className="lg:p-4 py-3 px-0 block border-b-2 border-transparent text-gray-600 hover:text-gray-900" href="#">Dashboard</a></li>
          </ul>
        </nav>
        <a href="#" className="lg:ml-4 flex items-center justify-start lg:mb-0 mb-4 pointer-cursor" id="userdropdown">
          <img className="rounded-full w-10 h-10 border-2 border-transparent hover:border-pink-400 ignore-body-click" src="https://pbs.twimg.com/profile_images/1163965029063913472/ItoFLWys_normal.jpg" alt="avatar" />
        </a>
        <div id="usermenu" className="absolute lg:mt-12 pt-1 z-40 left-0 lg:left-auto lg:right-0 lg:top-0 invisible lg:w-auto w-full">
          <div className="bg-white shadow-xl lg:px-8 px-6 lg:py-4 pb-4 pt-0 rounded lg:mr-3 rounded-t-none">
            <a href="/settings" className="pb-2 block text-gray-600 hover:text-gray-900 ignore-body-click">Settings</a>
            <a href="/logout" className="block text-gray-600 hover:text-gray-900 ignore-body-click">Logout</a>
          </div>
        </div>
      </div>
    </header>
    <div className="container mx-auto max-w-3xl mt-8">
      {/*     @if (session('alert'))
      <p>{{ session('alert') }}</p>
@endif */}
      <h1 className="text-2xl font-bold text-gray-700 px-6 md:px-0">Account Settings</h1>
      <ul className="flex border-b border-gray-300 text-sm font-medium text-gray-600 mt-3 px-6 md:px-0">
      <li className="mr-8 text-gray-900 hover:border-b-2 border-gray-800">
        <Link to="/userprofile" className="py-4 inline-block">Your Profile</Link>
      </li>
        <li className="mr-8 text-gray-900 border-b-2 border-gray-800"><a href="#_" className="py-4 inline-block">Change Password</a></li>
        
      </ul>
      <form onSubmit={handleFormSubmit}>
        <div className="w-full bg-white rounded-lg mx-auto mt-8 flex overflow-hidden rounded-b-none">
          <div className="w-1/3 bg-gray-100 p-8 hidden md:inline-block">
            <h2 className="font-medium text-md text-gray-700 mb-4 tracking-wide">Change Password</h2>
          </div>
          <div className="md:w-2/3 w-full">
            <div className="py-8 px-16">
              <label htmlFor="oldPassword" className="text-sm text-gray-600">Current Password</label>
              <input
                className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-black"
                type="password"
                value={passwordData.oldPassword}
                name="oldPassword"
                onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
              />
            </div>
            <hr className="border-gray-200" />
            <div className="py-8 px-16">
              <label htmlFor="newPassword" className="text-sm text-gray-600">New Password</label>
              <input
                className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-black"
                type="password"
                value={passwordData.newPassword}
                name="newPassword"
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              />
            </div>     
          </div>
        </div>
        <div className="flex justify-between items-center  p-16 py-8 bg-gray-100 rounded-b-lg border-t border-gray-300">
          <div className="text-xs text-gray-500 tracking-tight">
            <p>Click to update your Password</p>
          </div>

          <div className="flex items-center bg-black text-white text-sm font-medium px-6 py-2 rounded float-right uppercase cursor-pointer">
            <input type="submit" value="Save" defaultValue="Save" />
          </div>
        </div>
      </form>
    </div>
  </div>
  );
}
