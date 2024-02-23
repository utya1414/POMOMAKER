import React from "react";
import TimerList from "@/lib/components/timer/TimerList";
import TopMenubar from "@/lib/components/TopMenubar";

const Home = () => {
  return (
    <div className="w-full">
      <TopMenubar />
      <TimerList />
    </div>
  );
};

export default Home;
