import React from "react";
import Menubar from "@/lib/components/Menubar";
import TimerList from "@/lib/components/TimerList";

const Home = () => {
  return (
    <div className="w-full">
      <Menubar />
      <TimerList />
    </div>
  );
};

export default Home;
