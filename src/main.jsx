import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CustomRouter from "../CustomRouter";
import "./index.css"; // Ensure your styles are imported
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CustomRouter>
      <App />
    </CustomRouter>
  </React.StrictMode>
);
