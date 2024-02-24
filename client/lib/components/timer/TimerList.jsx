import React, { Suspense } from "react";
import { GetAllTimerCardStats } from "@/api/timer";
import StatsTimerCard from "./StatsTimerCard";
import { ScrollArea } from "@/lib/components/shadcn-ui/scroll-area";

const TimerList = () => {
  return (
    <div className="w-full">
      <Suspense
        fallback={<StatsTimerCard loading={true} timer_info={undefined} />}
      >
        <TimerCardStatsWrapper />
      </Suspense>
    </div>
  );
};

async function TimerCardStatsWrapper() {
  const stats = await GetAllTimerCardStats();
  return <StatsTimerCards loading={false} data={stats} />;
}

const StatsTimerCards = (props) => {
  const { loading, data } = props;
  return (
    <ScrollArea className="h-[900px] py-8">
      <div className="flex flex-col space-y-2 mx-12 my-12">
        {data.timers.map((timer, index) => {
          return (
            <StatsTimerCard key={index} loading={loading} timer_info={timer} />
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default TimerList;
