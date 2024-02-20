"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

function ThemeSwitcher({ iconStyle }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // avoid rehydration errors
  return (
    <>
      {theme === "dark" ? (
        <button onClick={() => setTheme("light")}>
          <MoonIcon className={iconStyle} />
        </button>
      ) : (
        <button onClick={() => setTheme("dark")}>
          <SunIcon className={iconStyle} />
        </button>
      )}
    </>
  );
}

export default ThemeSwitcher;
