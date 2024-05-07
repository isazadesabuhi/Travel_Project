"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

function Trips(){
  const router = useRouter();

  const [trips,setTrips] = useState(null)

  useEffect(() => {
    axios.get("http://localhost:8000/api/trips").then((response) => {
      setTrips(response.data)
    }).catch((error) =>{
      console.log(error)
    })
  },[])


  return(
    <main>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl text-center font-bold mb-4">All Trips</h1>
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
                <Link href={`trips/${item.slug}`} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                  Go to Trip
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  
  )
}

export default Trips