"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";

function Navbar() {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();

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
  // console.log(userData);

  const logout = () => {
    axios
      .post(
        "http://localhost:8000/api/user/logout/",
        {},
        {
          withCredentials: true, // Ensure credentials are sent with the request
        }
      )
      .then((response) => {
        if (response.data.message === "success") {
          Cookies.remove("jwt"); // Remove the JWT cookie
          setuserInfo(null);
          setIsAuth(false);
          router.push("/login"); // Redirect the user to the login page
        }
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
    localStorage.removeItem("access");
    router.push("/login");
  };
  
  return (
    <nav className="flex flex-row justify-between">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href="/" className="btn btm-nav-label text-xl">
            Travel Project
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/trips">Trips</Link>
            </li>
            {userData ? (
              <li>
                <Link href="/profile">{userData?.first_name}</Link>
              </li>
            ) : (
              ""
            )}
            {userData ? (
              <li className="rounded-full">
                <Image
                  className=""
                  width={60}
                  height={60}
                  src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="default photo"
                />
              </li>
            ) : (
              ""
            )}
            {userData ? (
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            ) : (
              <li>
                <Link href="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
