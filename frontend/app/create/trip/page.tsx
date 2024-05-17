"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";

function TripCreate() {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  const formObject = [
    // {
    //   input: "user",
    //   placeholder: "User id",
    //   type: "number",
    // },
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
  ];
  const router = useRouter();

  return (
    <div className="px-[300px]">
      <h1 className="text-center text-[50px]">Create a trip</h1>
      <form
        className="flex flex-col"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("http://localhost:8000/api/create/trip/", data);
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

        <p>{data}</p>
        <input type="submit" />
      </form>
    </div>
  );
}

export default TripCreate;
