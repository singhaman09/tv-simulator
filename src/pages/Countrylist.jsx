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

function FocusableList({ children }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full" style={{ outline: "none" }}>
      {children}
    </ul>
  );
}

function CountryList() {
  const [countries, setCountries] = useState([]);
  const { search } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { ref, focusKey } = useFocusable({
    focusKey: "COUNTRY_PAGE",
    trackChildren: true,
    preferredChildFocusKey: "search-bar",
  });

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all?fields=name,region,capital,flags,cca2")
      .then((res) => {setCountries(res.data)
       setLoading(false); })
      .catch((err) => {console.error("Failed to fetch countries", err)
       setLoading(false); });
  }, []);

  // Set initial focus to search bar
  useEffect(() => {
    setTimeout(() => {
      setFocus("search-bar");
    }, 300);
  }, []);

  const filteredCountries = countries.filter((c) =>
    c.name?.common?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className=" bg-white min-h-screen  text-orange-600 flex flex-col gap-6">
        <Header />
        <SearchBar />
 <main className="flex-grow flex items-center justify-center p-6">
          {loading ? (
            <div className="text-xl font-bold text-black animate-pulse">
  Loading countries...
</div>

          ) : (
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
                    className={`p-4 rounded-xl bg-white shadow-md border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      focused
                        ? "border-orange-500 ring-4 ring-orange-300 bg-gradient-to-r from-orange-50 to-gray-50 shadow-xl scale-105"
                        : "border-gray-200 hover:border-orange-400 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {country.flags?.png && (
                        <img
                          src={country.flags.png}
                          alt={`${country.name?.common} flag`}
                          className="w-12 h-8 object-cover rounded"
                        />
                      )}
                      <span className="text-lg font-semibold text-orange-600">
                        {country.name?.common || "Unnamed Country"}
                      </span>
                    </div>
                  </li>
                )}
              </Focusable>
            );
          })}
        </FocusableList>)}
</main>
        <Footer />
      </div>
    </FocusContext.Provider>
  );
}

export default CountryList;