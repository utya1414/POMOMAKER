# linux の場合の venv 仮想環境への入り方

> sudo apt-get install dos2unix
> Reading package lists... Done
> 色々
>
> > dos2unix venv/Scripts/activate
> > dos2unix: converting file venv/Scripts/activate to Unix format...
> > source venv/Scripts/activate

# インストールした python ライブラリ

pip install flask_sqlalchemy
pip install flask_login
pip install flask_migrate
pip install werkzeug.security

# API DESIGN

- Status Code

```

Status Code	Status Message	Meaning
200	OK	問題ありません
201	Created	新しいリソースが作成されました
400	Bad Request	リクエストが無効です
401	Unauthorized	認証がないか、有効ではない
403	Forbidden	リクエストが確認できましたが、許可されませんでした
404	Not Found	リソースが見つかりません
500	Internal Server Error	サーバーに問題があります
503	Service Unavailable	サーバーがリクエストを完了できません

```

#### GET /api/timer

- success

```
{
    "status": "success"
    "message": ~
    "data": {
         timers : [
            {
            "timer_id": timer_id,
            "user_id": user_id,
            "timer_name": timer_name,
            "timer_description": timer_description,
            "work_length": work_length,
            "break_length": break_length,
            "rounds": rounds,
            "work_sound_source": work_sound_source,
            "break_sound_source": break_sound_source,
            "isPublic": isPublic
           },
           {
            "timer_id": timer_id,
            "user_id": user_id,
            "timer_name": timer_name,
            "timer_description": timer_description,
            "work_length": work_length,
            "break_length": break_length,
            "rounds": rounds,
            "work_sound_source": work_sound_source,
            "break_sound_source": break_sound_source,
            "isPublic": isPublic
           }
         ]
    }
}
```

- fail ( リクエスト側のバグ )

```
{
    "status": "fail"
    "message": ~
}
```

- error ( サーバー側のバグ )

```
{
    "status": "error"
    "message": ~
}
```
