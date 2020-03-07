const dev = process.env.NODE_ENV === "development";

export default {
  apiUrl: `${dev ? "http://localhost" : "https://textbox.alles.cx"}/api/v1`,
  dev
};
