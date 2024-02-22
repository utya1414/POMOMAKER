import { ServerBaseURL } from "@/lib/constant/index.js";

// ユーザー登録、サインアップ機能
// 引数: email, password, name　返却値: 無し
export async function SignUp (email, password, name) {
    await fetch(`${ServerBaseURL}/user/signup`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
    });
};

// ログイン機能
// 引数: email, password　返却値: 無し
export async function LogIn (email, password) {
    await fetch(`${ServerBaseURL}/user/login`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
};

// ログアウト機能
// 引数: 無し　返却値: 無し
export async function LogOut () {
    const response = await fetch(`${ServerBaseURL}/user/logout`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
    });
};

// ログインしているユーザにのみ、ユーザー情報を返却する
// 引数: 無し　返却値: 'user_id', 'email', 'user_name', 'description', 'created_at', 'updated_at'
export async function GetUserInfo () {
    const response = await fetch(`${ServerBaseURL}/user/info`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
};

// ユーザー情報を更新する
// 引数: 'email', 'password', 'user_name', 'description'　返却値: 無し
export async function UpdateUserInfo (email, password, user_name, description) {
    await fetch(`${ServerBaseURL}/user/update`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, user_name, description }),
    });
};

// ユーザー情報を削除する
// 引数: 無し　返却値: 無し
export async function DeleteUserInfo () {
    await fetch(`${ServerBaseURL}/user/delete`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
    });
};

// アクセスしたユーザーがログインしているかどうかをTrue or Falseで返却する
// 引数: 無し　返却値: True or False
export const IsLoggedIn = async () => {
    const response = await fetch(`${ServerBaseURL}/user/isLoggedIn`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
};
