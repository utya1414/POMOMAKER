"use client";
import React, { useEffect, useState } from "react";

export default function Home() {
  const URL = "http://127.0.0.1:8080/api/"

  const [message, setMessage] = useState("");
  useEffect(() => {
    console.log(URL + "home")
    fetch(URL + "home")
      .then((response) => response.json())
      .then((data) => setMessage(data.message));
  }, [])

  const [input_data, setInputData] = useState("")
  function handleEnter(e) {
    if (e.key === "Enter") {
      setInputData(e.target.value)
      fetch(URL + "user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "user_name": e.target.value })
      })
    }
  }

  const [users_data, setUsersData] = useState([])
  function handleClick() {
    fetch(URL + "user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((data) => setUsersData(data.users))
  }

  return (
    <>
      <h1>here is first page</h1>
      <p>Message from server: {message}</p>
      <br></br>
      <p>↓に入力欄</p>
      <input type="text" onKeyDown={handleEnter}></input>
      <p>your input: {input_data}</p>
      <br></br>
      <button onClick={handleClick}>このボタンで一覧を取得</button>
      <div>
        Users data: {users_data.map((user, index) => <p key={index}>{user.user_name}</p>)}
      </div>
    </>
  );
}
