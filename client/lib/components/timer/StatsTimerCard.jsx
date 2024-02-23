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

export default StatsTimerCard;
