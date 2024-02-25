import React from "react";
import { GetTimerCardStatsById } from "@/api/timer";
import Timer from "./Timer";

const TimerStatsWrapper = async ({ timer_id }) => {
  const timer_info = await GetTimerCardStatsById(timer_id);
  return <StatsTimer timer_info={timer_info} />;
};

const StatsTimer = ({ timer_info }) => {
  return (
    <>
      <Timer timer_info={timer_info} />
    </>
  );
};

export default TimerStatsWrapper;
