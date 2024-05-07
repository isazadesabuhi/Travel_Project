"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
