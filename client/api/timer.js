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
  });

  const json_response = await response.json();
  if (json_response.status === "failed")
    throw new Error("Failed to create timer");
  if (json_response.status === "error") throw new Error("Error creating timer");
};

export const GetTimerCardStatsById = async (timer_id) => {
  const response = await fetch(ServerBaseURL + "timer/" + timer_id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json_response = await response.json();
  if (json_response.status === "failed")
    throw new Error("Failed to fetch timer");
  if (json_response.status === "error") throw new Error("Error fetching timer");
  return json_response.data;
};

export const GetAllTimerCardStats = async () => {
  const response = await fetch(ServerBaseURL + "timer", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const json_response = await response.json();
  if (json_response.status === "failed")
    throw new Error("Failed to fetch timers");
  if (json_response.status === "error")
    throw new Error("Error fetching timers");
  return json_response.data;
};

export const EditTimer = async (data, timer_id) => {
  const response = await fetch(ServerBaseURL + "timer/" + timer_id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json_response = await response.json();
  if (json_response.status === "failed")
    throw new Error("Failed to edit timer");
  if (json_response.status === "error") throw new Error("Error editing timer");
};

export const DeleteTimer = async (timer_id) => {
  const response = await fetch(ServerBaseURL + "timer/" + timer_id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json_response = await response.json();
  if (json_response.status === "failed")
    throw new Error("Failed to delete timer");
  if (json_response.status === "error") throw new Error("Error deleting timer");
};
