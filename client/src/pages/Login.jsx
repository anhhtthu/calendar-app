import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({
    user: {
      username: "",
      password: "",
    },
    redirectToReferrer: false,
  });

  const handleChange = (e) => {
    setFormData({
      user: {
        ...formData.user,
        [e.target.name]: e.target.value,
      },
      redirectToReferrer: false,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("", {
        username: formData.user.username,
        password: formData.user.password,
      });
      const token = response.data.token; 
      localStorage.setItem("token", token); 
      setFormData({ ...formData, redirectToReferrer: true }); 
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  if (formData.redirectToReferrer) {
    return <Navigate to="/Calendar" />; // Redirect to Calendar.jsx if redirectToReferrer is true
  }

  return (
   
      <div className="flex items-center justify-center h-screen">
        <form action="" className="w-[33%] bg-white rounded-lg border border-primary Border shadow-md py-10 px-10 relative">
          <div>
            <p className="text-gray-700 text-4xl mb-6">Welcome back! </p>
          </div>

          <div>
            <h1 className="text-gray-600 text-2xl mb-5">
              Login to your account
            </h1>
          </div>

          <div>
          <div className="text-gray-600 text-left mb-2">
            <label>Username:</label>
          </div>
            <input
              name="username"
              type="text"
              value={formData.user.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className={
                "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              }
            />
          </div>

          <div>
          <div className="text-gray-600 text-left mb-2">
            <label>Password:</label>
          </div>
            <input
              name="password"
              type="password"
              value={formData.user.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={
                "text-gray-500 w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              }
            />
          </div>
          
          <div>
          <div className="flex items-center mt-5 justify-center">
              <button
                className={
                  "bg-black py-2 px-4 text-md text-white rounded border border-violet focus:outline-none focus:border-black"
                }
                value="Login" 
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
         
        </form>
        </div>
     

  );
}

