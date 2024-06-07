// pages/countries.js
import { useState, useEffect } from "react";

const CountriesComponent = ({ onSelectedCountriesChange }) => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch("http://localhost:8000/api/user/countries/");
      if (response.ok) {
        const data = await response.json();
        setCountries(data);
      } else {
        console.error("Failed to fetch countries");
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (search.length >= 1) {
      const filtered = countries.filter(
        (country) =>
          country.name.toLowerCase().startsWith(search.toLowerCase()) &&
          !selectedCountries.some((selected) => selected.code === country.code)
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  }, [search, countries, selectedCountries]);

  useEffect(() => {
    const result = selectedCountries.map((country) => country.name);
    onSelectedCountriesChange(result);
  }, [selectedCountries, onSelectedCountriesChange]);

  const handleSelectCountry = (country) => {
    setSelectedCountries([...selectedCountries, country]);
  };

  return (
    <div>
      <h1>Select Countries</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search countries"
      />
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.code} onClick={() => handleSelectCountry(country)}>
            {country.name}
          </li>
        ))}
      </ul>
      <div>
        <h2>Selected Countries:</h2>
        <ul>
          {selectedCountries.map((country) => (
            <li key={country.code}>{country.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CountriesComponent;
