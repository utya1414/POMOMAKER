"use client";
import { Card, CardContent } from "../shadcn-ui/card";
import { Skeleton } from "../shadcn-ui/skeleton";

import EditTimerBtn from "./EditTimerBtn";
import DeleteTimerBtn from "./DeleteTimerBtn";

const StatsTimerCard = (props) => {
  const { loading, timer_info } = props;
  if (loading || timer_info === undefined) {
    return (
      <Card className="min-w-full">
        <CardContent>
          <Skeleton />
        </CardContent>
      </Card>
    );
  }

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
    <Card className="min-w-full">
      <CardContent className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold mt-6 mb-1">{timer_name}</h1>
          <div className="flex space-x-1 text-muted-foreground">
            <p>作業時間 {work_length}分</p>
            <p>休憩時間 {break_length}分</p>
            <p>ラウンド数 {rounds}回</p>
          </div>
        </div>
        <div className="mt-6">
          <EditTimerBtn timer_id={timer_id} />
          <DeleteTimerBtn timer_id={timer_id} />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsTimerCard;
