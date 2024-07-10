"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";

function TripCreate() {
  const [categories, setCategories] = useState([]);
  const [accommodation_types, setAccommodation_types] = useState([]);
  const [types, setTypes] = useState([]); // Add state for trip types
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();


  // Fetch categories from API
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/category/trip`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/type/trip`)
      .then((response) => {
        setTypes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // Add useEffect to fetch trip types

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/type/accommodation`)
      .then((response) => {
        setAccommodation_types(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Get token from local storage
  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      setToken(accessToken);
    }
  }, []);

  const formObject = [
    {
      input: "title",
      placeholder: "Title",
      type: "text",
    },
    {
      input: "place",
      placeholder: "Place",
      type: "text",
    },
    {
      input: "price",
      placeholder: "Price",
      type: "number",
    },
    {
      input: "starting_time",
      placeholder: "Starting Time",
      type: "date",
    },
    {
      input: "description",
      placeholder: "Description",
      type: "text",
    },
    {
      input: "duration",
      placeholder: "Duration",
      type: "number",
    },
    {
      input: "accommodation_info",
      placeholder:"Add more information about the accommodation such as the type of accommodation (hotel, hostel, apartment) and if your TripMates will have a private or shared room.",
      type: "textarea",
    },
  ];




  const onSubmit = async (formData) => {
    if (!token) {
      console.error("No token found");
      return;
    }

    // Map selected categories to their full object representation
    formData.categories = formData.categories?.map(
      (name: any) => categories.find((category) => category.name === name).name
    );

    formData.accommodation_types = formData.accommodation_types?.map(
      (name: any) => accommodation_types.find((accommodation_type) => accommodation_type.name === name).name
    );

    // Ensure trip_type is a dictionary
    const selectedTripType = types.find(
      (type) => type.name === formData.trip_type
    );
    formData.trip_type = selectedTripType;


    try {
      console.log("Form Data to be sent:", formData); // Debug: Log the form data

      const response = await axios.post(
        "http://localhost:8000/api/create/trip/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response.data);
      console.log("Response Data:", response.data); // Debug: Log the response data
      router.push("/");
    } catch (error) {
      console.error(
        "Error creating trip:",
        error.response ? error.response.data : error.message
      ); // Debug: Log any errors

      // Additional debugging information
      if (error.response) {
        console.log("Error Status:", error.response.status);
        console.log("Error Headers:", error.response.headers);
        console.log("Error Data:", error.response.data);
      }
    }
  };

  return (
    <div className="px-[300px]">
      <h1 className="text-center text-[50px]">Create a trip</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        {formObject.map((item, index) => (
          <label
            key={index}
            className="input input-bordered flex items-center gap-2 mb-[10px]"
          >
            <input
              {...register(item.input)}
              placeholder={item.placeholder}
              type={item.type}
            />
          </label>
        ))}
        <section>
          <h2 className="text-[20px] text-blue-300">Categories</h2>
          <div className="grid grid-cols-3">
            {categories.map((category) => (
              <label key={category.id}>
                <input
                  {...register("categories")}
                  type="checkbox"
                  value={category.name}
                />
                {category.name}
              </label>
            ))}
          </div>
          
        </section>
        <section>
        <h2 className="text-[20px] text-blue-300">Accommodation Types</h2>
        <div className="grid grid-cols-3">
            {accommodation_types.map((accommodation_type) => (
              <label key={accommodation_type.id}>
                <input
                  {...register("accommodation_types")}
                  type="checkbox"
                  value={accommodation_type.name}
                />
                {accommodation_type.name}
              </label>
            ))}
          </div>
          </section>
        <section>
          <h2 className="text-[20px] text-blue-300">Trip Type</h2>
          <div>
            {types.map((type) => (
              <label key={type.id}>
                <input
                  {...register("trip_type")}
                  type="radio"
                  value={type.name}
                />
                {type.name}
              </label>
            ))}
          </div>
        </section>
        <input type="submit" />
      </form>
    </div>
  );
}

export default TripCreate;
