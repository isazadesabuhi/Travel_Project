"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

function Profile() {
  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user/profile/", {
        headers: {
          // Add your headers here
          Authorization: "Bearer YOUR_ACCESS_TOKEN",
          "Content-Type": "application/json", // Example header
        },
        withCredentials: true, // Add this line to send credentials
      })
      .then((response) => {
        setLoggedIn(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <main>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl text-center font-bold mb-4">
          {loggedIn?.first_name}'s profile
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col">
            name:{loggedIn?.first_name}
            <div>name:{loggedIn?.first_name}</div>
            <div>last name:{loggedIn?.last_name}</div>
            <div>email: {loggedIn?.email}</div>
            <div>id: {loggedIn?.id}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
