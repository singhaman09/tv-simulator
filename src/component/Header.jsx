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
    <header className="sticky top-0 z-10 bg-gray-800/80 backdrop-blur-sm px-6 py-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold text-white tracking-tight">Country & User App</h1>
      {isLoggedIn && (
        <FocusContext.Provider value={focusKey}>
          <nav ref={ref} className="flex items-center gap-4">
            <Focusable 
              onEnterPress={() => navigate("/country")} 
              focusKey="nav-country"
              onArrowPress={({ direction }) => {
                if (direction === "down") {
                  setTimeout(() => {
                    const firstItem = document.querySelector(' [data-focus-key^="user-"]');
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
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out
                    ${focused 
                      ? "bg-blue-600 text-white border-blue-500 ring-2 ring-blue-500/30 shadow-md shadow-blue-500/20" 
                      : "bg-gray-700/50 text-blue-300 border-transparent hover:bg-gray-600/50"
                    }`}
                  aria-label="Navigate to Countries"
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
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out
                    ${focused 
                      ? "bg-blue-600 text-white border-blue-500 ring-2 ring-blue-500/30 shadow-md shadow-blue-500/20" 
                      : "bg-gray-700/50 text-blue-300 border-transparent hover:bg-gray-600/50"
                    }`}
                  aria-label="Navigate to Users"
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
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out
                    ${focused 
                      ? "bg-red-600 text-white border-red-500 ring-2 ring-red-500/30 shadow-md shadow-red-500/20" 
                      : "bg-red-500/80 text-white border-red-500 hover:bg-red-500"
                    }`}
                  aria-label="Logout"
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