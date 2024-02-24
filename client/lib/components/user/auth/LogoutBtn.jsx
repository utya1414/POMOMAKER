"use client";
import React from "react";
import { Button } from "@/lib/components/shadcn-ui/button";
import { useRouter } from "next/navigation";
const LogoutBtn = () => {
  const router = useRouter();
  const onClickHandler = () => {
    console.log("logout");
    router.push("auth/login");
  };
  return (
    <div>
      <Button onClick={onClickHandler}>ログアウト</Button>
    </div>
  );
};

export default LogoutBtn;
