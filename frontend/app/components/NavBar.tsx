"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);

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
              {isAuth ? (
                <Link href="/logout">Logout</Link>
              ) : (
                <Link href="/login">Login</Link>
              )}
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
