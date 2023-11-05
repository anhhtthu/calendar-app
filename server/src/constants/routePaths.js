const API_BASE = "/api/v1";

const ROUTES = {
  // User Authentication Route
  AUTH: {
    BASE: `${API_BASE}/auth`,
  },

  // Calendars Route
  CALENDARS: {
    BASE: `${API_BASE}/calendars`,
  },

  // Events Route
  EVENTS: {
    BASE: `${API_BASE}/events`,
    GET: '/',
    CREATE: '/',
    UPDATE: '/:eventId',
    DELETE: '/:eventId',
  },

  // Search & Filter Route
  SEARCH: {
    BASE: `${API_BASE}/search`,
  },
};

module.exports = ROUTES;
