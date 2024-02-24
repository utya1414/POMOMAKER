"use client";
import React, { useState, useEffect } from "react";
import { user_access } from "@/api/user";

const UserInfo = () => {
    const [user_data, setUserData] = useState({});

    useEffect(() => {
        async function fetchData() {
            const result = await user_access.GetUserInfo();
            setUserData(result.data);
            console.log("user_data", result.data);
        }
        fetchData();
    },[]);

    return (
        <div>
            <h1>ユーザーページ</h1>
            <h2>ユーザー情報</h2>
            {/* 以下にmapを使ってuser_dataの全ての情報を出力する */}
            {Object.keys(user_data).map((key, index) => {
                return (
                    <div key={index}>
                        <p>{key}: {user_data[key]}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default UserInfo;
