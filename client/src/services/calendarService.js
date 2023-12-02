import React from "react";
import { ROUTES } from "../constants/routePaths";

const handleErrors = (error) => {
  if (error.response) {
    console.log(error.response);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log("Error", error.message);
  }
  throw error;
};

export const calendarCreate = async (payload) => {
  try {
    const response = await fetch(ROUTES.CALENDAR.CREATE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};
