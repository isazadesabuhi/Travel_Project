"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function Login() {
  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [btnClicked, setbtnClicked] = useState(false);

  const data = {
    email: email,
    password: password,
  };

  function handleClick() {
    console.log("btn is clicked");
    setbtnClicked(true);
  }

  useEffect(() => {
    if (btnClicked) {
      axios
        .post("http://localhost:8000/api/user/login/", data, {
          headers: {
            // Add your headers here
            "Content-Type": "application/json", // Example header
          },
          withCredentials: true, // Add this line to send credentials
        })
        .then((response) => {
          setLoggedIn(response.data); // Update the type of the `loggedIn` state variable
          localStorage.setItem("access_token", response.data.access);
          localStorage.setItem("refresh_token", response.data.refresh);
          router.push("/");
          console.log(response);
          // if (response.data.isSuccess) {
          //   setLoggedIn(true);
          // }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [data, btnClicked, router]);
  console.log(loggedIn);
  return (
    <div>
      <label class="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="w-4 h-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          name="email"
          type="email"
          value={email}
          class="grow"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
      </label>
      <label class="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="w-4 h-4 opacity-70"
        >
          <path
            fill-rule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clip-rule="evenodd"
          />
        </svg>
        <input
          name="password"
          type="password"
          value={password}
          class="grow"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </label>
      <button onClick={handleClick} class="btn">
        Log in{" "}
      </button>
    </div>
  );
}
export default Login;
