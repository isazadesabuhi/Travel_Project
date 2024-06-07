"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

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
    <main>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl text-center font-bold mb-4">
          {userData?.first_name}'s profile
        </h1>
        <div className="flex flex-col">
          <Link className="text-red-400" href="/update/profile">
            update profile
          </Link>
          <Link className="text-red-400" href="/update/user_password">
            update password
          </Link>
        </div>
        <Image
          className=""
          width={100}
          height={100}
          src={userData?.profile_picture}
          alt={userData?.first_name}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <div>name:{userData?.first_name}</div>
            <div>last name:{userData?.last_name}</div>
            <div>email: {userData?.email}</div>
            <div>id: {userData?.id}</div>
            {/* <div>countries {userData?.countries_visited}</div> */}
            countries that i have visited:
            {userData?.countries_visited.map((country, index) => (
              <div key={index} className="flex flex-col">
                {index + 1}:{country}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
