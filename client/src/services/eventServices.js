import apiClient from "../api/apiClient";
import { ROUTES } from "../constant/apiPath";

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

export async function getEvents(startTime, endTime, navigate) {
  try {
    const response = await apiClient.get(
      `${ROUTES.EVENTS.BASE}?customStartTime=${startTime}&customEndTime=${endTime}`
    );
    console.log(response.data.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      navigate("/login");
    }
    handleErrors(error);
  }
}

export async function createEvent(event, navigate) {
  try {
    const response = await apiClient.post(ROUTES.EVENTS.BASE, event);
    console.log(response);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      navigate("/login");
    }
    handleErrors(error);
  }
}

export async function updateEvent(event, eventId, navigate) {
  try {
    const response = await apiClient.put(
      `${ROUTES.EVENTS.BASE}/${eventId}`,
      event
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      navigate("/login");
    }
    handleErrors(error);
  }
}

export async function deleteEvent(eventId, navigate) {
  try {
    const response = await apiClient.delete(`${ROUTES.EVENTS.BASE}/${eventId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      navigate("/login");
    }
    handleErrors(error);
  }
}
