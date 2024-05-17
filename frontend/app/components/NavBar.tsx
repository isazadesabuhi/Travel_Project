"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";

function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);

  const router = useRouter();

  const [userInfo, setuserInfo] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user/profile/", {
        withCredentials: true, // Add this line to send credentials
      })
      .then((response) => {
        setuserInfo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [router.pathname]);

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
            <li>
              <Link href="/search">Search Trips</Link>
            </li>
            {userInfo ? (
              <li>
                <Link href="/profile">{userInfo?.first_name}</Link>
              </li>
            ) : (
              ""
            )}
            {userInfo ? (
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
