"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";

function UserUpdate() {
  const { register, handleSubmit, setValue } = useForm();
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      setToken(accessToken);
      fetchUserData(accessToken);
    }
  }, []);

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
        setValue(key, userData[key]);
      });
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response ? error.response.data : error.message
      );
    }
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

      console.log("Response Data:", response.data);
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
        {/* <label className="input input-bordered flex items-center gap-2 mb-[10px]">
          <input {...register("email")} placeholder="Email" type="email" />
        </label> */}
        {/* <label className="input input-bordered flex items-center gap-2 mb-[10px]">
          <input
            {...register("password")}
            placeholder="Password"
            type="password"
          />
        </label> */}
        <label className="input input-bordered flex items-center gap-2 mb-[10px]">
          <input
            {...register("countries_visited")}
            placeholder="Countries Visited"
            type="text"
          />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}

export default UserUpdate;
