import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFocusable, FocusContext } from "@noriginmedia/norigin-spatial-navigation";
import Header from "../component/Header";
import Footer from "../component/footer";
import SearchBar from "../component/SearchBar";
import { AppContext } from "../context/AppContext";

// Reusable Focusable wrapper
function Focusable({ onEnterPress, children, focusKey, onClick }) {
  const { ref, focused } = useFocusable({ onEnterPress, focusKey });
  return (
    <div ref={ref} tabIndex={-1} onClick={onClick}>
      {children(focused, { ref })}
    </div>
  );
}

function FocusableList({ children }) {
  const { ref } = useFocusable({
    focusKey: "country-list",
    trackChildren: true,
    autoRestoreFocus: true,
  });

  return (
    <ul ref={ref} className="grid gap-3" style={{ outline: "none" }}>
      {children}
    </ul>
  );
}

function CountryList() {
  const [countries, setCountries] = useState([]);
  const { search } = useContext(AppContext);
  const navigate = useNavigate();

  const { ref, focusKey } = useFocusable({
    focusKey: "COUNTRY_PAGE",
    trackChildren: true,
  });

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all?fields=name,region,capital,flags,cca2")
      .then((res) => setCountries(res.data))
      .catch((err) => console.error("Failed to fetch countries", err));
  }, []);

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
              >
                {(focused, { ref }) => (
                  <li
                    ref={ref}
                    className={`p-3 rounded border cursor-pointer transition ${
                      focused ? "border-blue-500 bg-gray-700" : "border-gray-600"
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
