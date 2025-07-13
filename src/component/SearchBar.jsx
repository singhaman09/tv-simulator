import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";

// Reusable Focusable wrapper
function Focusable({ onEnterPress, children, focusKey, onClick }) {
  const { ref, focused } = useFocusable({ onEnterPress, focusKey });
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
      onEnterPress={() => document.getElementById("searchInput")?.focus()}
    >
      {(focused, { ref }) => (
        <input
          ref={ref}
          id="searchInput"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`border p-2 mb-4 w-full rounded outline-none ${
            focused ? "ring-2 ring-blue-400 border-blue-500" : "border-gray-600"
          }`}
          placeholder="Search..."
        />
      )}
    </Focusable>
  );
}

export default SearchBar;
