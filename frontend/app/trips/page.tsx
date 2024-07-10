"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import TripCart from ".././components/TripCart";

function Trips() {
  const router = useRouter();

  const [trips, setTrips] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/trips")
      .then((response) => {
        setTrips(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <main>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl text-center font-bold mb-4">All Trips</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trips?.map((item, index) => {
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <TripCart
                  title={item.title}
                  place={item.place}
                  price={item.price}
                  starting_time={item.starting_time}
                  description={item.description}
                  duration={item.duration}
                  user={item.user.username}
                  slug={item.slug}
                  categories={item.categories}
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Trips;
