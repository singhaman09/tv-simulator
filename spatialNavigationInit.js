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
    distanceCalculationMethod: "left",
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
  });

  console.log("Spatial navigation initialized");
};