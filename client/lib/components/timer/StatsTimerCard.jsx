"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../shadcn-ui/card";
import { Skeleton } from "../shadcn-ui/skeleton";
import { Label } from "../shadcn-ui/label";

import EditTimerBtn from "./EditTimerBtn";

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
      <CardContent>
        <h1 className="text-2xl font-extrabold mt-6 mb-1">{timer_name}</h1>
        <div className="flex space-x-1 text-muted-foreground">
          <p>作業時間 {work_length}分</p>
          <p>休憩時間 {break_length}分</p>
          <p>ラウンド数 {rounds}回</p>
        </div>
        <EditTimerBtn />
      </CardContent>
    </Card>
  );
};

export default StatsTimerCard;
