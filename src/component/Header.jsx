import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {
  useFocusable,
  FocusContext,
  setFocus,
} from "@noriginmedia/norigin-spatial-navigation";

// Reusable focusable wrapper
function Focusable({ onEnterPress, children, focusKey, onClick, onArrowPress }) {
  const { ref, focused } = useFocusable({ 
    onEnterPress, 
    focusKey,
    onArrowPress,
    onClick
  });
  return (
    <div ref={ref} tabIndex={-1} onClick={onClick}>
      {children(focused, { ref })}
    </div>
  );
}

function Header() {
  const { isLoggedIn, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const { ref, focusKey } = useFocusable({
    focusKey: "header-nav",
    trackChildren: true,
    preferredChildFocusKey: "nav-country",
  });

  return (
    <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Country & User App</h1>
      {isLoggedIn && (
        <FocusContext.Provider value={focusKey}>
          <nav
            ref={ref}
            className="flex gap-4"
          >
            <Focusable 
              onEnterPress={() => navigate("/country")} 
              focusKey="nav-country"
              onArrowPress={({ direction }) => {
                if (direction === "down") {
                  // Navigate to first item in the list
                  setTimeout(() => {
                    const firstItem = document.querySelector('[data-focus-key^="country-"], [data-focus-key^="user-"]');
                    if (firstItem) {
                      const focusKey = firstItem.getAttribute("data-focus-key");
                      if (focusKey) {
                        setFocus(focusKey);
                      }
                    }
                  }, 10);
                  return true;
                }
                return false;
              }}
            >
              {(focused, { ref }) => (
                <button
                  ref={ref}
                  onClick={() => navigate("/country")}
                  className={`cursor-pointer px-3 py-1 rounded underline transition border-2 ${
                    focused 
                      ? "border-blue-500 ring-2 ring-blue-400 bg-blue-700" 
                      : "border-transparent text-blue-400"
                  }`}
                >
                  Countries
                </button>
              )}
            </Focusable> 

            <Focusable 
              onEnterPress={() => navigate("/users")} 
              focusKey="nav-users"
              onArrowPress={({ direction }) => {
                if (direction === "down") {
                  // Navigate to first item in the list
                  setTimeout(() => {
                    const firstItem = document.querySelector('[data-focus-key^="country-"], [data-focus-key^="user-"]');
                    if (firstItem) {
                      const focusKey = firstItem.getAttribute("data-focus-key");
                      if (focusKey) {
                        setFocus(focusKey);
                      }
                    }
                  }, 10);
                  return true;
                }
                return false;
              }}
            >
              {(focused, { ref }) => (
                <button
                  ref={ref}
                  onClick={() => navigate("/users")}
                  className={`cursor-pointer px-3 py-1 rounded underline transition border-2 ${
                    focused 
                      ? "border-blue-500 ring-2 ring-blue-400 bg-blue-700" 
                      : "border-transparent text-blue-400"
                  }`}
                >
                  Users
                </button>
              )} 
            </Focusable> 

            <Focusable 
              onEnterPress={() => logout(() => navigate("/"))} 
              focusKey="nav-logout"
              onArrowPress={({ direction }) => {
                if (direction === "down") {
                  // Navigate to first item in the list
                  setTimeout(() => {
                    const firstItem = document.querySelector('[data-focus-key^="country-"], [data-focus-key^="user-"]');
                    if (firstItem) {
                      const focusKey = firstItem.getAttribute("data-focus-key");
                      if (focusKey) {
                        setFocus(focusKey);
                      }
                    }
                  }, 10);
                  return true;
                }
                return false;
              }}
            >
              {(focused, { ref }) => (
                <button
                  ref={ref}
                  onClick={() => logout(() => navigate("/"))}
                  className={`px-3 py-1 rounded transition border-2 ${
                    focused 
                      ? "bg-red-700 border-red-400 ring-2 ring-red-400" 
                      : "bg-red-500 border-red-500"
                  }`}
                >
                  Logout
                </button>
              )}
            </Focusable> 
          </nav>
        </FocusContext.Provider>
      )}
    </header>
  );
}

export default React.memo(Header);