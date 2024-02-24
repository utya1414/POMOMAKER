"use client";
import { Card, CardContent } from "../shadcn-ui/card";
import { Skeleton } from "../shadcn-ui/skeleton";
import { Button } from "../shadcn-ui/button";

import EditTimerBtn from "./EditTimerBtn";
import DeleteTimerBtn from "./DeleteTimerBtn";

import { useRouter } from "next/navigation";

const StatsTimerCard = (props) => {
  const router = useRouter();
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
  const onClickHandler = () => {
    router.push(`/timer/${timer_id}`);
  };
  return (
    <Card className="min-w-full flex justify-between items-center">
      <CardContent
        className="w-full border-r hover:bg-muted hover:rounded-l-xl cursor-pointer"
        onClick={onClickHandler}
      >
        <div>
          <h1 className="text-2xl font-extrabold mt-6 mb-1">{timer_name}</h1>
          <div className="flex space-x-1 text-muted-foreground">
            <p>作業時間 {work_length}分</p>
            <p>休憩時間 {break_length}分</p>
            <p>ラウンド数 {rounds}回</p>
          </div>
        </div>
      </CardContent>
      <div className=" min-w-64 flex justify-center space-x-2">
        <EditTimerBtn timer_id={timer_id} />
        <DeleteTimerBtn timer_id={timer_id} />
      </div>
    </Card>
  );
};

export default StatsTimerCard;
