export const CreateTimer = async (data) => {
  const response = await fetch(ServerBaseURL + "timer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const GetTimers = async (id) => {
  const response = await fetch(ServerBaseURL + "timer/" + id);
  return response.json();
};

export const GetTimerCardStats = async () => {
  const response = await fetch(ServerBaseURL + "timer/stats");
  return response.json();
};
