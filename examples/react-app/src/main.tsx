import React from "react";
import { createRoot } from "react-dom/client";
// The design-system stylesheet — required once, at the app root.
import "@andy-ui/tokens/andy-ui.css";
import { initTheme } from "@andy-ui/react";
import { App } from "./App";

initTheme("light");

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
