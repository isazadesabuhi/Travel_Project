"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function Register() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [btnClicked, setbtnClicked] = useState(false);

  const router = useRouter();

  const data = {
    first_name:firstname,
    last_name:lastname,
    email:email,
    password:password
  };

  function handleClick() {
    console.log("btn is clicked");
    setbtnClicked(true);
  }

  useEffect(() => {
    if (btnClicked) {
      axios
        .post("http://localhost:8000/api/user/register/", data, {})
        .then((response) => {
          setLoggedIn(response);
          if (response.statusText == "Created") {
            router.push("/login");
          }
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [data, btnClicked]);
console.log(data)
  return (
    <div>
      <label class="input input-bordered flex items-center gap-2">
        
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
        
        <input
          name="first_name"
          type="text"
          value={firstname}
          class="grow"
          onChange={(e) => setFirstname(e.target.value)}
          placeholder="First name"
          required
        />
      </label>

      <label class="input input-bordered flex items-center gap-2">
        
        <input
          name="last_name"
          type="text"
          value={lastname}
          class="grow"
          onChange={(e) => setLastname(e.target.value)}
          placeholder="First name"
          required
        />
      </label>
      <label class="input input-bordered flex items-center gap-2">
        
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
export default Register;
