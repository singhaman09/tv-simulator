import React from "react";
import ReactDOM from "react-dom/client";
import { initSpatialNavigation } from "../spatialNavigationInit";
import App from "./App";
import CustomRouter from "../CustomRouter";
import "./index.css";

document.addEventListener("DOMContentLoaded", () => {
  console.log("🌐 DOMContentLoaded, initializing spatial navigation");
  try {
    initSpatialNavigation();
    setTimeout(() => {
      console.log("🔍 Post-initialization check:", {
        debugSpatialNav: typeof window.debugSpatialNav,
        spatialNavInstance: !!window.__SPATIAL_NAVIGATION__,
      });
      if (window.__SPATIAL_NAVIGATION__) {
        console.log("✅ Spatial navigation instance exists");
        window.debugSpatialNav();
      } else {
        console.error("❌ Spatial navigation instance missing");
        console.log("🔎 Debugging: Library loaded?", {
          init: typeof window.__SPATIAL_NAVIGATION__?.init,
          setFocus: typeof window.__SPATIAL_NAVIGATION__?.setFocus,
          navigateByDirection: typeof window.__SPATIAL_NAVIGATION__?.navigateByDirection,
        });
      }
    }, 1000);
  } catch (error) {
    console.error("❌ Failed to initialize spatial navigation in main.jsx:", error);
  }

  ReactDOM.createRoot(document.getElementById("root")).render(
    <CustomRouter>
      <App />
    </CustomRouter>
  );
});

window.addEventListener("keydown", (e) => {
  console.log("🔑 Standalone keydown:", {
    key: e.key,
    keyCode: e.keyCode,
    code: e.code,
    target: e.target.tagName,
  });
});