import React from "react";
import { GetUserInfo } from "@/api/user";
import UserBtn from "@/lib/components/layouts/UserInfo";
const UserInfo = async () => {
  const result = await GetUserInfo();
  if (!result) {
    return <div>ユーザー情報がありません</div>;
  }
  const { user_id, email, user_name, description, created_at, updated_at } =
    result;

  return (
    <div>
      <UserBtn />
    </div>
  );
};

export default UserInfo;
