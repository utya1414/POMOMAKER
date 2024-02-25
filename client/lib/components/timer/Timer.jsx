"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaPlay, FaStop } from "react-icons/fa";
import { useToast } from "@/lib/components/shadcn-ui/use-toast";
function Timer({ timer_info }) {
  const { toast } = useToast();
  const SECONDS = 60;
  const router = useRouter();
  const {
    break_length,
    break_sound_source,
    isPublic,
    rounds,
    timer_description,
    timer_id,
    timer_name,
    user_id,
    work_length,
    work_sound_source,
  } = timer_info.timer;
  const workTime = work_length;
  const breakTime = break_length;
  const totalTime = workTime * SECONDS; // 25分を秒単位で
  const [isOnBreak, setIsOnBreak] = useState(false); // 休憩モードを追跡
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [isRunning, setIsRunning] = useState(false); // タイマーの動作状態を追跡
  const [currentCycle, setCurrentCycle] = useState(0); // 例として現在は2回目
  const totalCycles = rounds;

  useEffect(() => {
    let interval; // 型を明示的に指定
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isOnBreak) {
      if (currentCycle + 1 === totalCycles) {
        toast({
          status: "success",
          description: (
            <>
              <p className="font-bold">お疲れ様！</p>
            </>
          ),
        });
        router.push("/");
        return;
      }
      setIsOnBreak(true); // 休憩モードに移行
      setTimeLeft(breakTime); // 休憩時間をセット
    } else if (timeLeft === 0 && isOnBreak) {
      setIsOnBreak(false); // 休憩モードを解除
      setTimeLeft(workTime); // 次のサイクルの作業時間をセット
      setCurrentCycle(currentCycle + 1); // サイクル数を更新
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isOnBreak, workTime, breakTime, currentCycle]);

  function startTimer() {
    if (timeLeft > 0) setIsRunning(true); // タイマーを開始
  }

  function stopTimer() {
    setIsRunning(false); // タイマーを停止
  }

  // 残り時間を分:秒形式で表示
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // プログレスの計算
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  const circumference = 2 * Math.PI * 40; // 円周の長さ (2πr)

  // プログレスに基づいてoffsetを計算（逆向きに動かすためには、この計算を調整）
  const progressOffset = circumference - (progress / 100) * circumference;
  const renderCycleIndicators = () => {
    let indicators = [];
    for (let i = 0; i < totalCycles; i++) {
      indicators.push(
        <div
          key={i}
          className={`h-4 w-4 rounded-full ${
            i < currentCycle ? "bg-blue-500" : "bg-gray-300"
          } mx-1`}
        ></div>
      );
    }
    return indicators;
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {/* サイクルインジケーターの表示 */}
      <div className="flex justify-center items-center mt-2">
        {renderCycleIndicators()}
      </div>

      {/* 現在の進行状況を示すテキスト */}
      <div className="text-center text-xl mt-2 font-semibold text-green-600">
        {isOnBreak
          ? "Break Time 🌴"
          : `Working on ${currentCycle}/${totalCycles} 🌱`}
      </div>

      <div className="flex flex-col items-center mt-4">
        <svg className="w-64 h-64" viewBox="0 0 100 100">
          {/* 背景の円 */}
          <circle
            className="stroke-current text-muted"
            strokeWidth="10"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
          />
          {/* プログレスの円 */}
          <circle
            className="stroke-current text-indigo-500"
            strokeWidth="10"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            transform="rotate(-90 50 50)"
          />
          {/* 中央のテキスト */}
          <text
            x="50"
            y="50"
            fontFamily="Verdana"
            fontSize="15"
            textAnchor="middle"
            alignmentBaseline="central"
          >
            {formatTime(timeLeft)}
          </text>
        </svg>
        <div className="flex justify-center items-center space-x-4 mt-4">
          {/* 開始ボタンと停止ボタンのコード */}
          <div className="flex justify-center items-center space-x-4 mt-4">
            <button
              onClick={startTimer}
              className={`p-3 rounded-full ${
                isRunning ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
              } text-white transition-colors duration-150`}
              disabled={isRunning}
            >
              <i className="fas fa-play">
                <FaPlay />
              </i>
            </button>

            <button
              onClick={stopTimer}
              className={`p-3 rounded-full ${
                !isRunning ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
              } text-white transition-colors duration-150`}
              disabled={!isRunning}
            >
              <i className="fas fa-stop">
                <FaStop />
              </i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timer;
