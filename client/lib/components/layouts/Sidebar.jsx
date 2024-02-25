import React from "react";
import { LuUserCircle2 } from "react-icons/lu";
import { AiOutlineHome } from "react-icons/ai";
import { FaRegChartBar } from "react-icons/fa";
import { LuMenuSquare } from "react-icons/lu";
import { FiSettings } from "react-icons/fi";
import Link from "next/link";
import ThemeSwitcher from "../ThemeSwitcher";

const iconStyle = "w-16 h-16 my-6";
const Sidebar = () => {
  return (
    <div className="flex flex-col justify-center items-center px-4 mx-4  my-8 bg-background outline outline-2 rounded-lg">
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
      <ThemeSwitcher iconStyle={iconStyle} />
    </div>
  );
};

export default Sidebar;
