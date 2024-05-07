"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { useRouter, usePathname } from "next/navigation";

import axios from "axios";

function Trips() {
  const router = useRouter();
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

  return (
    <main>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl text-center font-bold mb-4">All Trips</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-black">
              {trip?.title}
            </h2>
            <p className="text-gray-600 mb-4">Place:{trip?.place}</p>
            <p className="text-gray-600 mb-4">Price: ${trip?.price}</p>
            <p className="text-gray-600 mb-4">
              Starting Time: {trip?.starting_time}
            </p>
            <p className="text-gray-600 mb-4">
              Description: {trip?.description}
            </p>
            {/* <p className="text-gray-600 mb-4">Description: {trip.user}</p> */}
            <p className="text-gray-600 mb-4">
              Duration: {trip?.duration} days
            </p>
            <Link
              href={`${trip?.slug}`}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Go to Trip
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Trips;
