"use client";

import React from "react";
import Link from "next/link";

function TripCart({
  starting_time,
  place,
  price,
  duration,
  description,
  user,
  title,
  slug,
  categories,
  types
}) {

  return (
    <div>
      {/* <h2 className="text-xl font-semibold mb-2 text-black">{title}</h2>
      <p className="text-gray-600 mb-4">Place:{place}</p>
      <p className="text-gray-600 mb-4">Price: ${price}</p>
      <p className="text-gray-600 mb-4">Starting Time: {starting_time}</p>
      {description ? (
        <p className="text-gray-600 mb-4">Description: {description}</p>
      ) : null}

      <p className="text-gray-600 mb-4">Duration: {duration} days</p>
      <p className="text-gray-600 mb-4">
        created by <b>{user}</b>
      </p>
      <div className="flex flex-row gap-x-[5px]">
      {categories?.map((category,index)=>{
        return(
          <div key={index}>
            {category}
          </div>
        )
      })}
      </div>
      <p className="text-gray-600 mb-4">Trip type:{types?.name}</p>
      <p className="text-gray-600 mb-4">Trip type description:{types?.description}</p>
      <Link
        href={`/trips/${slug}/`}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        Go to Trip
      </Link>
       */}
       <div className="card glass w-96">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
      alt="car!" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{title}</h2>
    <p>{description}</p>
    <p>${price}</p>
    <p>Starting Time: {starting_time}</p>
    <p>by {user}</p>
    <div className="card-actions justify-end">
      <Link href={`/trips/${slug}/`} className="btn btn-primary">Go to Trip</Link>
    </div>
  </div>
</div>

    </div>
  );
}

export default TripCart;
