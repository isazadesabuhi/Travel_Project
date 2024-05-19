"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";

function Login() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

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

  return (
    <div className="px-[300px]">
      <h1 className="text-center text-[50px]">Login</h1>
      <form
        className="flex flex-col"
        onSubmit={handleSubmit(async (data) => {
          try {
            const response = await axios.post(
              "http://localhost:8000/api/token/",
              data,
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true, // Send credentials if necessary
              }
            );
            // Store the token in localStorage
            console.log(localStorage)
            localStorage.setItem("access", response.data.access); // Adjust if the token is in a different field
            console.log(response); // Debug: Log the token
            router.push("/");
          } catch (error) {
            console.log(error);
          }
        })}
      >
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
      <p>
        If you don't have an account, <Link href="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
