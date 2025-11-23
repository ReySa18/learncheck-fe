import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import LearncheckPage from "./pages/LearncheckPage";

const urlParams = new URLSearchParams(window.location.search);

const tutorialId = urlParams.get("tutorial_id") || urlParams.get("tutorial");
const userId = urlParams.get("user_id") || urlParams.get("user");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LearncheckPage tutorialId={tutorialId} userId={userId} />
  </React.StrictMode>
);
