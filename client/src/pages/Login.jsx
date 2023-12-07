import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ROUTES } from "../constant/apiPath";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(ROUTES.AUTH.BASE + ROUTES.AUTH.LOGIN, {
        username,
        password,
      });

      const accessToken = response.data.data.accessToken;
      sessionStorage.setItem("accessToken", accessToken);

      navigate("/calendar");
    } catch (error) {
      console.error("Login failed", error);

      if (error.response.data.errorCode === 1100) {
        setLoginError("Username or password is required");
      } else {
        setLoginError("Login failed. Please check your email or password");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="w-[33%] bg-white rounded-lg border border-primary Border shadow-md py-10 px-10 relative"
        onSubmit={handleLogin}
      >
        <div>
          <p className="text-gray-700 text-4xl mb-6">
            Welcome to your Calendar!
          </p>
          <h1 className="text-gray-600 text-2xl mb-5">Login to your account</h1>
        </div>

        {loginError && <div className="text-red-500 mb-3">{loginError}</div>}

        <div>
          <label className="text-gray-600 text-left mb-2 block">
            Username:
          </label>
          <input
            name="username"
            type="text"
            value={username}
            onChange={handleInputChange}
            placeholder="Enter your username"
            className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
          />
        </div>

        <div>
          <label className="text-gray-600 text-left mb-2 block">
            Password:
          </label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            className="text-gray-500 w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
          />
        </div>

        <div className="flex items-center mt-5 justify-center">
          <button
            type="submit"
            className="bg-black py-2 px-4 text-md text-white rounded border border-violet focus:outline-none focus:border-black"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
