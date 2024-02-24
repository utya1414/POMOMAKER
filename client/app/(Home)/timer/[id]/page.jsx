import React from "react";
import TimerStatsWrapper from "@/lib/components/timer/TimerStatsWrapper";

const page = ({ params }) => {
  const timer_id = params.id;
  return <TimerStatsWrapper timer_id={timer_id} />;
};

export default page;
