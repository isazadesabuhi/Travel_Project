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
  const [filteredCountries, setFilteredCountries] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      setToken(accessToken);
      fetchUserData(accessToken);
      fetchCountries(); // Fetch countries when the component mounts
    }
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter(
        (country) =>
          country.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !selectedCountries.some((selected) => selected.code === country.code)
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

      // Set form values with the fetched user data
      Object.keys(userData).forEach((key) => {
        if (key === "countries_visited" && userData[key]) {
          const selected = userData[key].map((code) => {
            const country = countries.find((country) => country.code === code);
            return { code, name: country ? country.name : code };
          });
          setValue(key, userData[key]); // Assuming userData[key] is an array of country codes
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
      ); // Adjust the URL as needed
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
      setValue("countries_visited", updatedCodes); // Update form value
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
    setValue("countries_visited", updatedCodes); // Update form value
  };

  const onSubmit = async (formData) => {
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8000/api/user/update/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.push("/"); // Redirect as needed
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="px-[300px]">
      <h1 className="text-center text-[50px]">Update User Information</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label className="input input-bordered flex items-center gap-2 mb-[10px]">
          <input {...register("username")} placeholder="Username" type="text" />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-[10px]">
          <input
            {...register("first_name")}
            placeholder="First Name"
            type="text"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-[10px]">
          <input
            {...register("last_name")}
            placeholder="Last Name"
            type="text"
          />
        </label>
        <div className="flex flex-col gap-y-[100px]">
          <div className="flex flex-row gap-2 mb-[10px] pb-[50px]">
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
          <label className="input input-bordered flex items-center gap-2 mb-[10px]">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search countries"
              className="input input-bordered"
            />
            <ul className="list list-none overflow-y-auto max-h-40">
              {filteredCountries.map((country) => (
                <li
                  key={country.code}
                  onClick={() => handleCountrySelect(country)}
                  className="cursor-pointer hover:bg-gray-200 p-2"
                >
                  {country.name}
                </li>
              ))}
            </ul>
          </label>
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

export default UserUpdate;
