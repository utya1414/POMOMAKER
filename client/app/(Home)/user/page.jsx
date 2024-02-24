import React from "react";
import UserInfo from "@/lib/components/user/UserInfo";
import LogoutBtn from "@/lib/components/user/auth/LogoutBtn";

const UserPage = () => {
  return (
    <div>
      <UserInfo />
      <LogoutBtn />
    </div>
  );
};

export default UserPage;
