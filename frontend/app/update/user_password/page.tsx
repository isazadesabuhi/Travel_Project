"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";

function UserPasswordUpdate() {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState(null); // Change initial state to null
  const [token, setToken] = useState(null); // State to store the token
  const router = useRouter();

  // useEffect to get the token once on component mount
  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      setToken(accessToken);
    }
  }, []);

  const formObject = [
    {
      input: "old_password",
      placeholder: "Old password",
      type: "password",
    },
    {
      input: "new_password",
      placeholder: "New password",
      type: "password",
    },
    {
      input: "confirm_new_password",
      placeholder: "Confirm new password",
      type: "password",
    },
  ];

  const onSubmit = async (formData) => {
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      console.log("Access Token:", token); // Debug: Log the token

      console.log("Token is valid. Proceeding with request...");

      const response = await axios.post(
        "http://localhost:8000/api/user/update-password/", // Ensure the URL matches your backend endpoint
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      setData(response.data);
      console.log("Response Data:", response.data); // Debug: Log the response data

      router.push("/"); // Redirect to login or another page as needed
    } catch (error) {
      console.error(
        "Error creating trip:",
        error.response ? error.response.data : error.message
      ); // Debug: Log any errors
    }
  };

  console.log("Form Data:", data); // Debug: Log the form data

  return (
    <div className="px-[300px]">
      <h1 className="text-center text-[50px]">Change password</h1>
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
        <input type="submit" />
      </form>
    </div>
  );
}

export default UserPasswordUpdate;
