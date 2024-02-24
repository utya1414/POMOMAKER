"use client";
import React from "react";
import { Button } from "@/lib/components/shadcn-ui/button";
import { useRouter } from "next/navigation";
import { user_access } from "@/api/user";

const LogoutBtn = () => {
  const router = useRouter();
  const onClickHandler = async () => {
    console.log("logout");
    const result = await user_access.LogOut();
    if (result.status === "success") {
      router.push("auth/login");
    }
  };
  return (
    <div>
      <Button onClick={onClickHandler}>ログアウト</Button>
    </div>
  );
};

export default LogoutBtn;
