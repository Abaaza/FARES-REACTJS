// src/analytics.js
import ReactGA from "react-ga4";

const TRACKING_ID = "G-Z3HCP2S7R3"; // Replace with your Measurement ID
ReactGA.initialize(TRACKING_ID);

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });
};
