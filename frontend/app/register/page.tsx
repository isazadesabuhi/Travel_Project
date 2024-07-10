"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";

function UserRegistration() {
  const { register, handleSubmit } = useForm();

  const formObject = [
    {
      input: "username",
      placeholder: "Username",
      type: "text",
    },
    {
      input: "first_name",
      placeholder: "First name",
      type: "text",
    },
    {
      input: "last_name",
      placeholder: "Last name",
      type: "text",
    },
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
      <h1 className="text-center text-[50px]">Register</h1>
      <form
        className="flex flex-col"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("http://localhost:8000/api/user/register/", data);
            router.push("/login");
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
    </div>
  );
}

export default UserRegistration;
