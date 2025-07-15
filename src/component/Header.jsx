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
    <header className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-md px-8 py-5 flex justify-between items-center shadow-lg border-b border-gray-700">
  <h1 className="text-3xl font-extrabold text-white tracking-tight">
    Country & User App
  </h1>

  {isLoggedIn && (
    <FocusContext.Provider value={focusKey}>
      <nav ref={ref} className="flex items-center gap-6">
        <Focusable 
          onEnterPress={() => navigate("/country")} 
          focusKey="nav-country"
          onArrowPress={({ direction }) => {
            if (direction === "down") {
              setTimeout(() => {
                const firstItem = document.querySelector(' [data-focus-key^="user-"]');
                if (firstItem) {
                  const focusKey = firstItem.getAttribute("data-focus-key");
                  if (focusKey) setFocus(focusKey);
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
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ease-in-out text-white
                ${focused 
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg ring-2 ring-blue-300 scale-105" 
                  : "bg-gray-800 text-blue-300 hover:bg-gray-700/80"
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
              setTimeout(() => {
                const firstItem = document.querySelector('[data-focus-key^="country-"], [data-focus-key^="user-"]');
                if (firstItem) {
                  const focusKey = firstItem.getAttribute("data-focus-key");
                  if (focusKey) setFocus(focusKey);
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
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ease-in-out text-white
                ${focused 
                  ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg ring-2 ring-indigo-300 scale-105" 
                  : "bg-gray-800 text-indigo-300 hover:bg-gray-700/80"
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
              setTimeout(() => {
                const firstItem = document.querySelector('[data-focus-key^="country-"], [data-focus-key^="user-"]');
                if (firstItem) {
                  const focusKey = firstItem.getAttribute("data-focus-key");
                  if (focusKey) setFocus(focusKey);
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
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ease-in-out
                ${focused 
                  ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg ring-2 ring-red-300 scale-105" 
                  : "bg-red-600/90 text-white hover:bg-red-700"
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