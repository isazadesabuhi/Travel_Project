"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";

function TripCreate() {
  const { register, handleSubmit } = useForm();

  const formObject = [
    {
      input: "email",
      placeholder: "Email",
      type: "email",
    },
    {
      input: "password",
      placeholder: "Password",
      type: "password",
    },
  ];

  const router = useRouter();

  return (
    <div className="px-[300px]">
      <h1 className="text-center text-[50px]">Login</h1>
      <form
        className="flex flex-col"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("http://localhost:8000/api/user/login/", data, {
              headers: {
                // Add your headers here
                "Content-Type": "application/json", // Example header
              },
              withCredentials: true, // Add this line to send credentials
            });
            router.push("/");
          } catch (error) {
            console.log(error);
          }
        })}
      >
        {formObject.map((item, index) => {
          return (
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
          );
        })}

        <input type="submit" />
      </form>
      <p>If you dont have account, <Link href="/register">Register</Link></p>
    </div>
  );
}

export default TripCreate;
