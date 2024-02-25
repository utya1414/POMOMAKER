"use client";
import React, { useState, useEffect } from "react";
import { GetAllTimerCardStats } from "@/api/timer";

const AllTimers = () => {
    const [timer_data, setUserData] = useState({});

    useEffect(() => {
        async function fetchData() {
            const result = await GetAllTimerCardStats();
            setUserData(result.data);
            console.log("timer_data", result.data);
        }
        fetchData();
    },[]);

    return (
        <div>
            <h1>皆のタイマー</h1>
            <h2>タイマー情報</h2>
            {/* 以下にmapを使ってtimer_dataの全ての情報を出力する */}
            {Object.keys(timer_data).map((key, index) => {
                return (
                    <div key={index}>
                        <p>{key}: {timer_data[key]}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default AllTimers;
