import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";

function Focusable({ onEnterPress, children, focusKey, onClick, onArrowPress }) {
  const { ref, focused } = useFocusable({
    onEnterPress,
    focusKey,
    onClick,
    onArrowPress,
  });

  return (
    <div ref={ref} tabIndex={-1} onClick={onClick}>
      {children(focused, { ref })}
    </div>
  );
}

function SearchBar() {
  const { search, setSearch } = useContext(AppContext);

  return (
    <Focusable
      focusKey="search-bar"
      onEnterPress={() => {
        const input = document.getElementById("searchInput");
        if (input) {
          input.focus();
          if (window.webOS?.keyboard) window.webOS.keyboard.show();
        }
      }}
      onArrowPress={({ direction }) => {
        if (direction === "down") {
          setTimeout(() => {
            const firstCountryItem = document.querySelector('[data-focus-key^="country-"]');
            if (firstCountryItem) {
              const focusKey = firstCountryItem.getAttribute("data-focus-key");
              if (focusKey) {
                console.log("Trying to focus on:", focusKey);
                setFocus(focusKey);
              }
            } else {
              console.log("No country items found");
            }
          }, 10);
          return true;
        }
        return false;
      }}
    >
      {(focused, { ref }) => {
        useEffect(() => {
          if (focused && ref.current) {
            ref.current.focus();
            if (window.webOS?.keyboard) window.webOS.keyboard.show();
          }
        }, [focused, ref]);

        return (
          <div className="relative w-full mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className={`w-5 h-5 transition-colors duration-200 ${
                  focused ? "text-blue-500" : "text-gray-400"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              ref={ref}
              id="searchInput"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (["Enter", "ArrowDown"].includes(e.key)) e.preventDefault();
              }}
              className={`w-full pl-10 pr-4 py-3 rounded-lg  text-black placeholder-gray-400
                border-2 transition-all duration-200 ease-in-out
                ${focused ? "border-blue-500 ring-2 ring-blue-500/30 shadow-lg shadow-blue-500/20" : "border-gray-600"}
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                hover:border-gray-500`}
              placeholder="Search..."
              autoComplete="off"
              inputMode="text"
              aria-label="Search input"
            />
            {search && (
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <svg
                  className="w-5 h-5 text-gray-400 hover:text-gray-200 transition-colors duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        );
      }}
    </Focusable>
  );
}

export default SearchBar;