import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  useFocusable,
  FocusContext,
  setFocus,
} from "@noriginmedia/norigin-spatial-navigation";
import Header from "../component/Header";
import Footer from "../component/footer";
import SearchBar from "../component/SearchBar";
import { AppContext } from "../context/AppContext";

// Reusable Focusable wrapper
function Focusable({ onEnterPress, children, focusKey, onClick, isFirstItem = false }) {
  const { ref, focused } = useFocusable({
    onEnterPress,
    focusKey,
    onClick,
    onArrowPress: ({ direction }) => {
      if (direction === "up" && isFirstItem) {
        // If this is the first item and user presses up, go back to search
        setFocus("search-bar");
        return true;
      }
      return false;
    },
  });

  return (
    <div ref={ref} tabIndex={-1} onClick={onClick}>
      {children(focused, { ref })}
    </div>
  );
}

// Simple list container without focus management
function FocusableList({ children }) {
  return (
    <ul className="grid gap-3" style={{ outline: "none" }}>
      {children}
    </ul>
  );
}

function CountryList() {
  const [countries, setCountries] = useState([]);
  const { search } = useContext(AppContext);
  const navigate = useNavigate();

  // Main page focus
  const { ref, focusKey } = useFocusable({
    focusKey: "COUNTRY_PAGE",
    trackChildren: true,
    preferredChildFocusKey: "search-bar",
  });

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all?fields=name,region,capital,flags,cca2")
      .then((res) => setCountries(res.data))
      .catch((err) => console.error("Failed to fetch countries", err));
  }, []);

  // Set initial focus to search bar
  useEffect(() => {
    setTimeout(() => {
      setFocus("search-bar");
    }, 300);
  }, []);

  // Filter countries based on search input
  const filteredCountries = countries.filter((c) =>
    c.name?.common?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="p-4 min-h-screen bg-black text-white flex flex-col gap-4">
        <Header />
        <SearchBar />

        <FocusableList>
          {filteredCountries.map((country, index) => {
            const goToDetail = () => navigate(`/country/${country.name?.common}`);
            const focusId = country.cca2 || country.name?.common || `country-${index}`;

            return (
              <Focusable
                key={focusId}
                focusKey={`country-${focusId}`}
                onEnterPress={goToDetail}
                onClick={goToDetail}
                isFirstItem={index === 0}
              >
                {(focused, { ref }) => (
                  <li
                    ref={ref}
                    data-focus-key={`country-${focusId}`}
                    className={`p-3 rounded border cursor-pointer transition border-2 ${
                      focused
                        ? "border-blue-500 ring-2 ring-blue-400 bg-gray-700"
                        : "border-gray-600 hover:border-blue-500 hover:bg-gray-700"
                    }`}
                  >
                    {country.name?.common || "Unnamed Country"}
                  </li>
                )}
              </Focusable>
            );
          })}
        </FocusableList>

        <Footer />
      </div>
    </FocusContext.Provider>
  );
}

export default CountryList;