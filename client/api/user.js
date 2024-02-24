import { ServerBaseURL } from "@/lib/constant/index.js";
import Cookies from 'js-cookie';

// ユーザー登録、サインアップ機能
// 引数: email, password, name　返却値: 
async function SignUp (email, password, name) {
    await fetch(`${ServerBaseURL}signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "email": email, "password": password, "user_name": name }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        // JWTをCookieに保存する
        Cookies.set('jwt', data.access_token);
    });
};

// ログイン機能
// 引数: email, password　返却値: 
async function LogIn (email, password) {
    await fetch(`${ServerBaseURL}login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        // JWTをCookieに保存する
        Cookies.set('jwt', data.access_token);
    });
};

// ログアウト機能
// 引数: 無し　返却値: 無し
async function LogOut () {
    await fetch(`${ServerBaseURL}logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get('jwt')}`,
        },
    })
    .then((response) => response.json())
    .then((data) => console.log(data));    
    // JWTをCookieから削除する
    Cookies.remove('jwt');
};

// ログインしているユーザにのみ、ユーザー情報を返却する
// 引数: 無し　返却値: 'user_id', 'email', 'user_name', 'description', 'created_at', 'updated_at'
async function GetUserInfo () {
    console.log("GetUserInfo:", Cookies.get('jwt'));
    const res = await fetch(`${ServerBaseURL}get_user_info`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get('jwt')}`,
        },
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        return data
    });
    return res;
};

// ユーザー情報を更新する
// 引数: 'email', 'password', 'user_name', 'description'　返却値: 無し
async function UpdateUserInfo (email, password, user_name, description) {
    await fetch(`${ServerBaseURL}update_user_info`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get('jwt')}`,
        },
        body: JSON.stringify({ "email": email, "password": password, "user_name": user_name, "description": description }),
    })
    .then((response) => response.json())
    .then((data) => console.log(data));
};

// ユーザー情報を削除する
// 引数: 無し　返却値: 無し
async function DeleteUserInfo () {
    await fetch(`${ServerBaseURL}delete`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get('jwt')}`,
        },
    })
    .then((response) => response.json())
    .then((data) => console.log(data));
    // JWTをCookieから削除する
    Cookies.remove('jwt');
};

// アクセスしたユーザーがログインしているかどうかをTrue or Falseで返却する
// 引数: 無し　返却値: True or False
const IsLoggedIn = async () => {
    const res = await fetch(`${ServerBaseURL}is_logged_in`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get('jwt')}`,
        },
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        return data
    });
    return res;
};

// すべての関数を一度にエクスポート
export const user_access = { SignUp, LogIn, LogOut, GetUserInfo, UpdateUserInfo, DeleteUserInfo, IsLoggedIn };
