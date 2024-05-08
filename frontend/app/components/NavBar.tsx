"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);

  const router = useRouter();

  const [btnClicked, setbtnClicked] = useState(false);

  function handleClick() {
    console.log("btn is clicked");
    setbtnClicked(true);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.push("/");
  }

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

  console.log(loggedIn);

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
            <li>
              <Link href="/search">{loggedIn?.first_name}</Link>
            </li>
            <li>
              {isAuth ? (
                <button onClick={handleClick}>Logout</button>
              ) : (
                <Link href="/login">Login</Link>
              )}
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2 bg-base-100 rounded-t-none">
                  <li>
                    <Link href="">Link 1</Link>
                  </li>
                  <li>
                    <Link href="">Link 2</Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
