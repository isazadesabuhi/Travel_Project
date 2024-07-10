"use client";
import React, { useEffect, useState } from "react";

import { useRouter, usePathname } from "next/navigation";

import axios from "axios";

function Trips() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/trip/${slug}/`)
      .then((response) => {
        setTrip(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [slug]);
  console.log(trip);
  return (
    <main>
      <div className="container mx-auto py-8 px-4 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl text-center font-extrabold text-gray-900 mb-6">
          {trip?.title}
        </h1>
        <div className="space-y-4 text-lg text-gray-700">
          <p>
            <span className="font-semibold">Place: </span>
            {trip?.place}
          </p>
          <p>
            <span className="font-semibold">Price: </span>
            {trip?.price}
          </p>
          <p>
            <span className="font-semibold">Starting Time: </span>
            {trip?.starting_time}
          </p>
          <p>
            <span className="font-semibold">Description: </span>
            {trip?.description}
          </p>
          <p>
            <span className="font-semibold">Duration: </span>
            {trip?.duration}
          </p>
          <p>
            <span className="font-semibold">User: </span>
            {trip?.user.username}
          </p>
          <p>
            <span className="font-semibold">Slug: </span>
            {trip?.slug}
          </p>
          <p>
            <span className="font-semibold">Categories: </span>
            {trip?.categories?.map((category, index) => (
              <div key={index}>{category}</div>
            ))}
          </p>
          <p>
            <span className="font-semibold">Trip Type: </span>
            {trip?.trip_type?.name}
          </p>
          <p>
            <span className="font-semibold">Accomondation Types: </span>
            {trip?.accommodation_types?.map((accommodation_type, index) => (
              <div key={index}>{accommodation_type}</div>
            ))}
          </p>
          <p>
            <span className="font-semibold">Accomondation Info: </span>
            {trip?.accommodation_info}
          </p>
        </div>
      </div>
    </main>
  );
}

export default Trips;
