import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Chess/App.tsx";
import "../src/Chess/components/Layout.less";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
