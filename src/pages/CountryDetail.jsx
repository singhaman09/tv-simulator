import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function CountryDetail() {
  const { name } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/name/${name}`)
      .then(res => setCountry(res.data[0]))
      .catch(err => console.log(err));
  }, [name]);

  if (!country) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{country.name.common}</h2>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Region: {country.region}</p>
      <p>Population: {country.population.toLocaleString()}</p>
    </div>
  );
}

export default CountryDetail;
