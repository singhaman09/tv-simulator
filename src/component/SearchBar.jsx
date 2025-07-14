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
          // Add a small delay to ensure DOM is updated
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
          <input
            ref={ref}
            id="searchInput"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (["Enter", "ArrowDown"].includes(e.key)) e.preventDefault();
            }}
            className={`border p-2 mb-4 w-full rounded outline-none border-2 ${
              focused ? "border-blue-500 ring-2 ring-blue-400" : "border-gray-600"
            }`}
            placeholder="Search..."
            autoComplete="off"
            inputMode="text"
          />
        );
      }}
    </Focusable>
  );
}
export default SearchBar;