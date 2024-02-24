"use client";
import React from "react";

const page = () => {

  const handleSignUp = () => {
    const email = "70"
    const password = "asdf"
    const name = "test"
    fetch("http://127.0.0.1:8080/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 'email': email, 'password': password, 'user_name': name}),
    })
    .then(response => {
      console.log("Sign Up Response: ", response.json())
    })
  }
  const handleLogIn = () => {
    const email = "62"
    const password = "asdf"
    fetch("http://127.0.0.1:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 'email': email, 'password': password}), 
    })
    .then(response => {
      console.log("Log In Response: ", response.json())
    })
  }
  const handleLogOut = () => {
    fetch("http://127.0.0.1:8080/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => {
      console.log("Log Out Response: ", response.json())
    })
  }
  const handleGetUser = () => {
    fetch("http://127.0.0.1:8080/api/get_user_info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => {
      console.log("Get User Response: ", response.json())
    })
  }

  return (
    <div>
      <h1>User Page</h1>
      <br />
      <button onClick={handleSignUp}>Sign Up</button>
      <br />
      <button onClick={handleLogIn}>Log In</button>
      <br />
      <button onClick={handleLogOut}>Log Out</button>
      <br />
      <button onClick={handleGetUser}>Get User</button>
      <br />
    </div>
  );
};

export default page;
