import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  useFocusable,
  setFocus,
  FocusContext,
} from "@noriginmedia/norigin-spatial-navigation";
import Header from "../component/Header";
import Footer from "../component/footer";

function CountryDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const backButtonRef = useRef(null);

  const { ref, focusKey } = useFocusable({
    focusKey: "COUNTRY_DETAIL_PAGE",
    trackChildren: true,
     preferredChildFocusKey: "BACK_BUTTON"
  });

  // Back button focus
  const { ref: backRef, focusKey: backFocused } = useFocusable({
    focusKey: "BACK_BUTTON",
    isFocusable: true,
    onEnterPress: () => {
      navigate('/country'); 
    },
  });

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,region,population,flags,subregion,languages,currencies`)
      .then((res) => setCountry(res.data[0]))
      .catch((err) => console.error("Failed to fetch country details", err));
  }, [name]);

  useEffect(() => {
  setTimeout(() => {
    setFocus("BACK_BUTTON");
  }, 100); // Slight delay ensures focus system is ready
}, []);


  const handleBackClick = () => {
    navigate('/country'); 
  };

  if (!country) {
    return (
      <div className="flex flex-col min-h-screen text-orange-600">
        <Header />
        <main className="flex-grow flex items-center justify-center p-6 sm:p-10">
          <p className="text-lg font-medium animate-pulse">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="bg-white flex flex-col min-h-screen text-orange-600">
        {/* <Header /> */}
        <main className="flex-grow flex flex-col items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-2xl mb-6">
            <button
              ref={(el) => {
                backButtonRef.current = el;
                backRef.current = el;
              }}
              onClick={handleBackClick}
              className="px-6 py-3 bg-orange-600 text-black font-semibold rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors duration-200 border-2 border-b-black"
            >
              ← Back to Countries
            </button>
          </div>
          
          <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8 space-y-6 transform hover:scale-[1.02] transition-transform duration-300">
            <h2 className="text-4xl font-extrabold text-center bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 animate-pulse">
              {country.name.common}
            </h2>
            {country.flags?.png && (
              <div className="flex justify-center">
                <img
                  src={country.flags.png}
                  alt={`${country.name.common} flag`}
                  className="w-32 h-20 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}
            <div className="space-y-4 text-lg font-medium">
              <p>
                <span className="font-semibold">Capital:</span>{" "}
                {country.capital?.[0] || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Region:</span>{" "}
                {country.region || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Subregion:</span>{" "}
                {country.subregion || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Population:</span>{" "}
                {country.population.toLocaleString() || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Languages:</span>{" "}
                {country.languages
                  ? Object.values(country.languages).join(", ")
                  : "N/A"}
              </p>
              <p>
                <span className="font-semibold">Currencies:</span>{" "}
                {country.currencies
                  ? Object.values(country.currencies)
                      .map((c) => `${c.name} (${c.symbol})`)
                      .join(", ")
                  : "N/A"}
              </p>
            </div>
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    </FocusContext.Provider>
  );
}

export default CountryDetail;