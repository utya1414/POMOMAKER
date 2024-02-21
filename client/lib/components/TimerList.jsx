"use client";
import React, { Suspense, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./shadcn-ui/card";
import { Skeleton } from "./shadcn-ui/skeleton";
import { Label } from "./shadcn-ui/label";

const TimerList = () => {
  return (
    <div className="w-full">
      <Suspense fallback={<StatsTimerCard loading={true} />}>
        <TimerCardStatsWrapper />
      </Suspense>
    </div>
  );
};

async function TimerCardStatsWrapper() {
  // const stats = await GetTimerCardStats();
  const stats = {
    timer_name: "Timer Name",
    timer_description: "Timer Description",
    work_length: 25,
    break_length: 5,
    rounds: 4,
    work_sound_source: null,
    break_sound_source: null,
    isPublic: false,
  };
  return <StatsTimerCards loading={false} data={stats} />;
}

const StatsTimerCards = (props) => {
  const { loading, data } = props;
  return (
    <div>
      <StatsTimerCard
        loading={loading}
        timer_name={data.timer_name}
        timer_description={data.timer_description}
        work_length={data.work_length}
        break_length={data.break_length}
        rounds={data.rounds}
        work_sound_source={data.work_sound_source}
        break_sound_source={data.break_sound_source}
        isPublic={data.isPublic}
      />
    </div>
  );
};

const StatsTimerCard = ({
  loading,
  timer_name,
  timer_description,
  work_length,
  break_length,
  rounds,
  work_sound_source,
  break_sound_source,
  isPublic,
}) => {
  useEffect(() => {
    console.log(
      "StatsTimerCard",
      timer_name,
      timer_description,
      work_length,
      break_length,
      rounds,
      work_sound_source,
      break_sound_source,
      isPublic,
      loading
    );
  }, []);
  return (
    <Card className="min-w-full">
      <CardContent>
        <Label>{timer_name}</Label>
        <div className="flex space-x-1">
          <p>{work_length}分</p>
          <p>{break_length}分</p>
          <p>{rounds}回</p>
        </div>
        <p>{work_sound_source}</p>
      </CardContent>
    </Card>
  );
};
export default TimerList;
