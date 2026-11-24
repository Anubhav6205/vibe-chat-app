// API_URL: the Express/Socket.io server. Defaults to localhost for local development.
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Demo mode runs the whole UI in the browser with scripted contacts and no server.
// It is on when VITE_DEMO_MODE=true, or in a production build with no VITE_API_URL
// (which is how the hosted demo on Vercel is built).
export const DEMO_MODE =
  import.meta.env.VITE_DEMO_MODE === "true" ||
  (import.meta.env.PROD && !import.meta.env.VITE_API_URL);
