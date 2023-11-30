import React, { useState } from "react";
import { Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({ 
    user: {
      username: "", 
      password: "",
      email: "",
      confirmPassword: ""
    },
  });

  const handleChange = (e) => {
    setFormData({
      user: {
        ...formData.user,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <figure className="h-screen flex bg-gray-100">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-1">
        <blockquote className="text-2xl font-medium text-center">
        </blockquote>
        
        <div className="text-primary m-6">
          <div className="flex items-center mt-3 justify-center">
            <h1 className="text-2xl font-medium text-primary mt-4 mb-2">
              Register a new account
            </h1>
          </div>
          <form>
            <label>Email:</label>
            <input
              name="email"
              type="email"
              value={formData.user.email}
              onChange={handleChange}
              placeholder="youremail@gmail.com"
              className={
                "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              }
            />
            <label>Username:</label>
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
            <label>Password:</label>
            <input
              name="password"
              type="password"
              value={formData.user.password}
              onChange={handleChange}
              placeholder="Should have at least 6 characters"
              className={
                "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              }
            />
            <label>Confirm Password:</label>
            <input
              name="confirmPassword"
              type="password"
              value={formData.user.confirmPassword}
              onChange={handleChange}
              placeholder="Enter Your Password Again"
              className={
                "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              }
            />
            <div className="flex items-center mt-3 justify-center">
              <button
                className={
                  "bg-blue-700 hover:bg-blue-500 py-2 px-4 text-md text-white rounded border border-blue focus:outline-none focus:border-black"
                }
                value="Register"
              >
                Register
              </button>
            </div>
          </form>
          <div className="flex items-center mt-3 justify-center">
            <Link to="/login" className="justify-center text-blue-500 hover:underline">
              Already have an account? Login here
            </Link>
          </div>
        </div>
      </div>
    </figure>
  );
}