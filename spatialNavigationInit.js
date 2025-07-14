// import { init, setKeyMap, setThrottle, destroy, doesFocusableExist } from "@noriginmedia/norigin-spatial-navigation";

// export const initSpatialNavigation = () => {
//   console.log("Initializing spatial navigation");
//   destroy();
//   init({
//     debug: true,
//     visualDebug: true,
//     nativeMode: false, // Explicitly disable native mode for web
//     shouldFocusDOMNode: true, // Enable native DOM focus for accessibility
//     domNodeFocusOptions: { preventScroll: false },
//   });

//   setKeyMap({
//     left: [205, 214],
//   up: [203, 211],
//   right: [206, 213],
//   down: [204, 212],
//   enter: [195]
//   });

//   setThrottle({
//     throttle: 100,
//     throttleKeypresses: true,
//   });

//   // Debug key events
//   window.addEventListener("keydown", (e) => {
//     console.log("Global keydown:", e.key, e.keyCode);
//     if (e.key === "ArrowDown") {
//       console.log("Testing spatial navigation down");
//       window.__SPATIAL_NAVIGATION__?.navigateByDirection("down");
//     } else if (e.key === "ArrowUp") {
//       console.log("Testing spatial navigation up");
//       window.__SPATIAL_NAVIGATION__?.navigateByDirection("up");
//     }
//   });

//   // Debug focusable components
//   console.log("Spatial navigation initialized:", window.__SPATIAL_NAVIGATION__);
//   setTimeout(() => {
//     console.log("Focusable components after init:", {
//       loginEmail: doesFocusableExist("login-email"),
//       loginPassword: doesFocusableExist("login-password"),
//       loginButton: doesFocusableExist("login-button"),
//       loginPage: doesFocusableExist("LOGIN_PAGE"),
//     });
//   }, 1000);
// };
// Explicit import check
import {
  init,
  setKeyMap,
  setThrottle,
  destroy,
  doesFocusableExist,
  getCurrentFocusKey,
  setFocus,
  navigateByDirection,
  on,
} from "@noriginmedia/norigin-spatial-navigation";

const isTV = () => {
  const ua = navigator.userAgent.toLowerCase();
  return (
    ua.includes("smart-tv") ||
    ua.includes("smarttv") ||
    ua.includes("tizen") ||
    ua.includes("webos") ||
    ua.includes("netcast") ||
    ua.includes("tv")
  );
};

export const initSpatialNavigation = () => {
  console.log("Initializing spatial navigation...");

  try {
    destroy(); // Clear previous instance if any
  } catch (e) {
    console.warn("No previous spatial nav to destroy");
  }

  init({
    debug: false,
    visualDebug: false,
    nativeMode: false,
    shouldFocusDOMNode: true,
    distanceCalculationMethod: "center",
    throttle: 50,
    throttleKeypresses: true,
  });

  const keyMap = isTV()
    ? {
        left: [205, 214, 9001, "ArrowLeft"],
        up: [203, 211, 9002, "ArrowUp"],
        right: [206, 213, 9003, "ArrowRight"],
        down: [204, 212, 9004, "ArrowDown"],
        enter: [13, 195, 9005, "Enter"],

      }
    : {
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        enter: 13,
      };

  setKeyMap(keyMap);
  setThrottle(40);

  // Attach debug globally
  window.__SPATIAL_NAVIGATION__ = {
    init,
    setKeyMap,
    setThrottle,
    destroy,
    doesFocusableExist,
    getCurrentFocusKey,
    setFocus,
    navigateByDirection,
    on,
  };

  // Optional global debug logger
  window.debugSpatialNav = () => {
    console.log("Spatial Navigation Debug Info:");
    console.log("Current focus:", getCurrentFocusKey?.());
    console.log("Components:", {
      email: doesFocusableExist("login-email"),
      password: doesFocusableExist("login-password"),
      button: doesFocusableExist("login-button"),
      page: doesFocusableExist("LOGIN_PAGE"),
    });
  };

  // Event listeners
  on?.("navready", () => console.log("Spatial navigation ready"));
  on?.("focus", (focusKey) => console.log("Focused:", focusKey));
  on?.("blur", (focusKey) => console.log("Blurred:", focusKey));
  on?.("naverror", (error) => console.error("Navigation error:", error));

  // Global key navigation fallback (only handle directional keys)
  window.addEventListener("keydown", (e) => {
    const code = e.keyCode;
    const currentFocus = getCurrentFocusKey();
    console.log(`Key: ${e.key} (${code}) | Focus: ${currentFocus}`);
    console.log(`Key pressed → Key: ${e.key}, Code: ${code}`);

    if ((isTV() && [204, 212, 9004].includes(code)) || code === 40) {
      navigateByDirection("down");
    } else if ((isTV() && [203, 211, 9002].includes(code)) || code === 38) {
      navigateByDirection("up");
    } else if ((isTV() && [205, 214, 9001].includes(code)) || code === 37) {
      navigateByDirection("left");
    } else if ((isTV() && [206, 213, 9003].includes(code)) || code === 39) {
      navigateByDirection("right");
    }
//     else if ((isTV() && [195, 9005].includes(code)) || code === 13) {
//   const activeElement = document.activeElement;
//   if (activeElement?.click) {
//     activeElement.click(); // fallback
//   }
// }
    // Enter key is handled by Focusable component's onEnterPress
  });

  console.log("Spatial navigation initialized");
};