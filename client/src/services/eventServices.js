// Purpose: To provide functions for fetching and saving events to local storage
export function fetchEvents() {
  const events = localStorage.getItem("savedEvents");
  const parsedEvents = events ? JSON.parse(events) : [];
  return parsedEvents;
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
