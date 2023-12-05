import apiClient from "../api/apiClient";
import { ROUTES } from "../constant/apiPath";
import axios from "axios";

// Purpose: To provide functions for fetching and saving events to local storage
export function fetchEvents() {
  try {
    const events = localStorage.getItem("savedEvents");
    const parsedEvents = events ? JSON.parse(events) : [];
    return parsedEvents;
  } catch {
    console.log("Failed to fetch events");
    return [];
  }
}

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

export async function createEvent(event) {
  try {
    const response = await apiClient.post(ROUTES.EVENTS.BASE, event);
    console.log(response);
    return response.data;
  } catch (error) {
    handleErrors(error);
  }
}

export async function updateEvent(event, eventId) {
  try {
    const response = await apiClient.put(
      `${ROUTES.EVENTS.BASE}/${eventId}`,
      event
    );
    console.log(response);
    return response.data;
  } catch (error) {
    handleErrors(error);
  }
}

export async function deleteEvent(eventId) {
  try {
    const response = await axios.delete(`${ROUTES.EVENTS.BASE}/${eventId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    handleErrors(error);
  }
}

export async function getEvents() {
  try {
    const response = await fetch(ROUTES.EVENTS.BASE.GET);
    return response.data;
  } catch (error) {
    handleErrors(error);
  }
}

//Purpose: To fetch events from server
// export async function fetchEvents() {
//   try {
//     const response = await fetch(`/api/events`);
//     if (!response.ok) {
//       throw new Error();
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.log("Failed to fetch events: ", error);
//     return [];
//   }
// }

// Purpose: To save events to local storage
export function saveCalendarEvents(events) {
  localStorage.setItem("savedEvents", JSON.stringify(events));
}

//Purpose: To save events to server
// export async function savedEvents(events) {
//   try {
//     const response = await fetch(`/api/events`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         //put token here
//       },
//       body: JSON.stringify(events),
//     });
//     if (!response.ok) {
//       throw new Error();
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.log("Failed to save events: ", error);
//     throw error;
//   }
// }
