"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

function Search() {
  const router = useRouter();

  const [trips, setTrips] = useState(null);

  const [query, setQuery] = useState("");
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000//api/search/trips/?search=${query}`)
      .then((response) => {
        setTrips(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query]);
  console.log(query);

  return (
    <main>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl text-center font-bold mb-4">Search Trips</h1>
        <label class="input input-bordered flex items-center gap-2">
          <input
            type="text"
            class="grow"
            value={query}
            onChange={handleChange}
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="w-4 h-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trips?.map((item, index) => {
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2 text-black">
                  {item.title}
                </h2>
                <p className="text-gray-600 mb-4">Place:{item.place}</p>
                <p className="text-gray-600 mb-4">Price: ${item.price}</p>
                <p className="text-gray-600 mb-4">
                  Starting Time: {item.starting_time}
                </p>
                <p className="text-gray-600 mb-4">
                  Description: {item.description}
                </p>
                {/* <p className="text-gray-600 mb-4">Description: {item.user}</p> */}
                <p className="text-gray-600 mb-4">
                  Duration: {item.duration} days
                </p>
                <Link
                  href={`trips/${item.slug}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Go to Trip
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Search;
