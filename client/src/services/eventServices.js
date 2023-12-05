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

export async function getEvents(startTime, endTime) {
  try {
    const response = await axios.get(
      `${ROUTES.EVENTS.BASE}?customStartTime=${startTime}&customEndTime=${endTime}`,
      {
        withCredentials: true,
      }
    );
    console.log(response);
  } catch (error) {
    handleErrors(error);
  }
}

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
