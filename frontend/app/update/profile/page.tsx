"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";

function UserUpdate() {
  const { register, handleSubmit, setValue } = useForm();
  const [token, setToken] = useState(null);
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      setToken(accessToken);
      fetchUserData(accessToken);
      fetchCountries();
    }
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter(
        (country) =>
          country.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !selectedCountries.some(
            (selected) => selected.code === country.code
          ) &&
          searchTerm.length > 2
      )
    );
  }, [searchTerm, countries, selectedCountries]);

  const fetchUserData = async (accessToken) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/user/update/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const userData = response.data;

      Object.keys(userData).forEach((key) => {
        if (key === "countries_visited" && userData[key]) {
          const selected = userData[key].map((code) => {
            const country = countries.find((country) => country.code === code);
            return { code, name: country ? country.name : code };
          });
          setValue(key, userData[key]);
          setSelectedCountries(selected);
        } else {
          setValue(key, userData[key]);
        }
      });
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/user/countries/"
      );
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const handleCountrySelect = (country) => {
    if (!selectedCountries.some((selected) => selected.code === country.code)) {
      const updatedCountries = [...selectedCountries, country];
      setSelectedCountries(updatedCountries);
      const updatedCodes = updatedCountries.map((country) => country.code);
      setValue("countries_visited", updatedCodes);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const removeCountry = (countryCode) => {
    const updatedCountries = selectedCountries.filter(
      (country) => country.code !== countryCode
    );
    setSelectedCountries(updatedCountries);
    const updatedCodes = updatedCountries.map((country) => country.code);
    setValue("countries_visited", updatedCodes);
  };

  const onSubmit = async (formData) => {
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      await axios.put("http://localhost:8000/api/user/update/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      router.push("/");
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-center text-4xl font-bold mb-8">
        Update User Information
      </h1>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4">
          <input
            {...register("username")}
            placeholder="Username"
            type="text"
            className="input input-bordered w-full p-2 border border-gray-300 rounded"
          />
          <input
            {...register("first_name")}
            placeholder="First Name"
            type="text"
            className="input input-bordered w-full p-2 border border-gray-300 rounded"
          />
          <input
            {...register("last_name")}
            placeholder="Last Name"
            type="text"
            className="input input-bordered w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {selectedCountries.map((country, index) => (
              <div
                key={index}
                className="bg-gray-200 rounded-full px-4 py-2 flex items-center gap-2"
              >
                {country.name}
                <button
                  type="button"
                  onClick={() => removeCountry(country.code)}
                  className="text-red-500"
                >
                  x
                </button>
              </div>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search countries"
              className="input input-bordered w-full p-2 border border-gray-300 rounded"
            />
            {searchTerm.length > 2 && (
              <ul className="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1 max-h-40 overflow-y-auto">
                {filteredCountries?.map((country) => (
                  <li
                    key={country.code}
                    onClick={() => handleCountrySelect(country)}
                    className="cursor-pointer  p-2"
                  >
                    {country.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserUpdate;
