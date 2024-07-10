"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
// import sab from "public"

function Profile() {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      setToken(accessToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8000/api/user/profile/",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserData(response.data);
        } catch (error) {
          console.error(
            "Error fetching user data:",
            error.response ? error.response.data : error.message
          );
        }
      };

      fetchUserData();
    }
  }, [token]);
  return (
    <main className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl text-center font-extrabold text-gray-800 mb-8">
          {userData?.first_name}'s Profile
        </h1>
        <div className="flex flex-col items-center mb-8">
          <Link
            className="text-blue-500 hover:text-blue-700 mb-2"
            href="/update/profile"
          >
            Update Profile
          </Link>
          <Link
            className="text-blue-500 hover:text-blue-700"
            href="/update/user_password"
          >
            Update Password
          </Link>
          <Link
            className="text-green-500 hover:text-green-700"
            href="/create/trip"
          >
            Create a Trip
          </Link>
        </div>
        <div className="flex justify-center mb-8">
          <Image
            className="rounded-full border-4 border-gray-300"
            width={150}
            height={150}
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="default photo"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              Personal Information
            </h2>
            <p className="mb-2">
              <span className="font-bold text-black">Name:</span>{" "}
              {userData?.first_name}
            </p>
            <p className="mb-2">
              <span className="font-bold text-black">Last Name:</span>{" "}
              {userData?.last_name}
            </p>
            <p className="mb-2">
              <span className="font-bold text-black">Email:</span>{" "}
              {userData?.email}
            </p>
            <p className="mb-2">
              <span className="font-bold text-black">ID:</span> {userData?.id}
            </p>
            <h3 className="mt-4 mb-2 font-semibold text-black">
              Countries Visited:
            </h3>
            <div className="pl-4">
              {userData?.countries_visited.map((country, index) => (
                <p key={index} className="mb-1">
                  {index + 1}. {country}
                </p>
              ))}
            </div>
            <Link
              className="text-blue-500 hover:text-blue-700 mt-4 inline-block"
              href={"mytrips/" + userData?.username}
            >
              My Trips
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
