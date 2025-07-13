import {
  init,
  setKeyMap,
  setThrottle,
  setFocus,
} from "@noriginmedia/norigin-spatial-navigation";

export const initSpatialNavigation = () => {
  init({
    debug: false,       // set to true to debug focus logs
    visualDebug: false, // shows focus outlines
  });

  // Optional but important: Remap keys for compatibility
  setKeyMap({
    left: "ArrowLeft",
    right: "ArrowRight",
    up: "ArrowUp",
    down: "ArrowDown",
    enter: "Enter",
  });

  // Optional: Reduce delay between keypress and movement
  setThrottle(100);

  //Set initial focus (make sure the component exists with this key)
//     setTimeout(() => {
//     setFocus("login-email");
//   }, 100);// Set focus on the email input
};
