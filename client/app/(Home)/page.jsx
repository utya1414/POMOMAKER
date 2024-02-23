import React from "react";
import TimerList from "@/lib/components/timer/TimerList";
import Menubar from "@/lib/components/Menubar";

const Home = () => {
  return (
    <div className="w-full">
      <Menubar />
      <TimerList />
    </div>
  );
};

export default Home;
