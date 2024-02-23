import { ServerBaseURL } from "@/lib/constant/index.js";

export const CreateTimer = async (data) => {
  console.log(data);
  // user_idを追加してpostしたい
  const response = await fetch(ServerBaseURL + "timer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
  if (response.status === "failed") throw new Error("Failed to create timer");
  if (response.status === "error") throw new Error("Error creating timer");
};

export const GetTimers = async (timer_id) => {
  const response = await fetch(ServerBaseURL + "timer/" + timer_id);
  return response.json();
};

export const GetTimerCardStats = async () => {
  const response = await fetch(ServerBaseURL + "timer", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

  if (response.status === "failed")
    throw new Error("Failed to fetch timer stats");

  if (response.status === "error")
    throw new Error("Error fetching timer stats");
  return response.data;
};

export const EditTimer = async (data, timer_id) => {
  console.log(data, timer_id);
  const response = await fetch(ServerBaseURL + "timer/" + { timer_id }, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());

  if (response.status === "failed") throw new Error("Failed to edit timer");
  if (response.status === "error") throw new Error("Error editing timer");
};
