import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
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
    <figure className="h-screen flex bg-gray-100">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primary Border shadow-md py-10 px-1 relative">
        <blockquote className="text-2xl font-medium "></blockquote>

        <div className="text-primary m-6 ">
          <div className="flex items-center mt-3">
          <h1 className="text-gray-500 text-2xl text-primary mt-2 mb-2 top-0 left-0">
  Login to your account
</h1>
<p className="text-gray-500 text-xs mt-4">Welcome back! </p>
          </div>
          <form>
            <label className="text-gray-500 text-left">Username:</label>
            <input
              name="username"
              type="text"
              value={formData.user.username}
              onChange={handleChange}
              placeholder="johndoe123"
              className={
                "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              }
            />
            <label className="text-gray-500 text-left">Password:</label>
            <input
              name="password"
              type="password"
              value={formData.user.password}
              onChange={handleChange}
              placeholder="Should have at least 6 characters"
              className={
                "text-gray-500 w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              }
            />
            <div className="flex items-center mt-3 justify-center">
              <button
                className={
                  "bg-violet-600 hover:bg-violet-500 py-2 px-4 text-md text-white rounded border border-violet focus:outline-none focus:border-black"
                }
                value="Login" 
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </form>
          <div className="flex flex-col items-center justify-center mt-3">
            <Link to="/register" className="text-violet-500 hover:underline">
              Don't have an account? Register
            </Link>
            
          </div>
        </div>
      </div>
    </figure>
  );
}

