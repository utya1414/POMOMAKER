import React from "react";
import { GetTimerCardStatsById } from "@/api/timer";
const TimerStatsWrapper = async ({ timer_id }) => {
  const timer_info = await GetTimerCardStatsById(timer_id);
  return <StatsTimer timer_info={timer_info} />;
};

const StatsTimer = ({ timer_info }) => {
  const {
    timer_id,
    user_id,
    timer_name,
    timer_description,
    work_length,
    break_length,
    rounds,
    work_sound_source,
    break_sound_source,
    isPublic,
  } = timer_info;
  return (
    <>
      {timer_id}
      {user_id}
      {timer_name}

      {timer_description}
    </>
  );
};
export default TimerStatsWrapper;
