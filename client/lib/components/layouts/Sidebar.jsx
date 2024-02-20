import React from "react";
import { LuUserCircle2 } from "react-icons/lu";
import { AiOutlineHome } from "react-icons/ai";
import { FaRegChartBar } from "react-icons/fa";
import { LuMenuSquare } from "react-icons/lu";
import { FiSettings } from "react-icons/fi";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const iconStyle = "w-16 h-16 my-6";
const Sidebar = () => {
  return (
    <div className="flex flex-col items-center px-16 py-24 mx-4 my-12 bg-gray-100 outline outline-2 rounded-lg">
      <Link href="/user">
        <LuUserCircle2 className={iconStyle} />
      </Link>
      <Link href="/">
        <AiOutlineHome className={iconStyle} />
      </Link>
      <Link href="/chart">
        <FaRegChartBar className={iconStyle} />
      </Link>
      <Link href="/history">
        <LuMenuSquare className={iconStyle} />
      </Link>
      <Link href="/setting">
        <FiSettings className={iconStyle} />
      </Link>
      <MoonIcon className={iconStyle} />
    </div>
  );
};

export default Sidebar;
