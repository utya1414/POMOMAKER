"use client";
import React, { useState, useEffect, useRef } from "react";
import { ServerBaseURL } from "@/lib/constant/index.js";
import CookieConsent  from "@/api/cookies_consent.jsx";
import Cookies from 'js-cookie';
import { user_access } from "@/api/user.js";

const page = () => {
  const formRef = useRef();
  const formloginRef = useRef();
  const formupdateRef = useRef();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const email = formRef.current["signupemail"].value;
    const password = formRef.current["signuppassword"].value;
    const user_name = formRef.current["signupname"].value;
    user_access.SignUp(email, password, user_name);
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    const email = formloginRef.current["loginemail"].value;
    const password = formloginRef.current["loginpassword"].value;
    user_access.LogIn(email, password);
  }

  const handleLogOut = () => {
    user_access.LogOut();
  };

  const handleGetInfo = () => {
    user_access.GetUserInfo();
  }

  const handleUpdate = () => {
    const email = formupdateRef.current["updateemail"].value;
    const password = formupdateRef.current["updatepassword"].value;
    const user_name = formupdateRef.current["updatename"].value;
    const description = formupdateRef.current["updatedescription"].value;
    user_access.UpdateUserInfo(email, password, user_name, description);
  }

  const handleDelete = () => {
    user_access.DeleteUser();
  }

  const handleCheck = () => {
    user_access.IsLoggedIn();
  }
  
  return (
    <div>
      {/* ログインの為のemailとpasswordとnameを入力するフォーム */}
      <h1>Sign Up</h1>
      <form ref={formRef}>
        <div>
          <label>Email:</label>
          <input type="email" id="signupemail" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" id="signuppassword" />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" id="signupname" />
        </div>
        <button type="submit" onClick={handleSignUp}>SignUP</button>
      </form>
      <br />
      {/* ログインの為のemailとpasswordを入力するフォーム */}
      <h1>Log In</h1>
      <form ref={formloginRef}>
        <div>
          <label>Email:</label>
          <input type="email" id="loginemail" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" id="loginpassword" />
        </div>
        <button type="submit" onClick={handleLogIn}>Log In</button>
      </form>
      <br />
      {/* ログアウトボタン */}
      <h1>以下がLog Outボタン</h1>
      <button onClick={handleLogOut}>Log Out</button>
      <br />
      {/* ログインしているユーザーのみ、ユーザー情報を表示する */}
      <h1>User Info</h1>
      <button onClick={handleGetInfo}>Get Info</button>
      <br />
      {/* ユーザー情報を更新するフォーム */}
      <h1>Update User Info</h1>
      <form ref={formupdateRef}>
        <div>
          <label>Email:</label>
          <input type="email" id="updateemail" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" id="updatepassword" />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" id="updatename" />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" id="updatedescription" />
        </div>
        <button type="submit" onClick={handleUpdate}>Update</button>
      </form>
      <br />
      {/* ユーザー情報を削除するボタン */}
      <h1>Delete User</h1>
      <button onClick={handleDelete}>Delete</button>
      <br />
      {/* アクセスしたユーザーがログインしているかどうかをTrue or Falseで返却する */}
      <h1>Check Log In</h1>
      <button onClick={handleCheck}>True or False</button>
    </div>
  );
};

export default page;
