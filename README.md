### 実行方法 (Windows 環境)

クライアントサーバーを起動<br>

```
cd client
npm run dev
```

バックエンドサーバーを起動<br>

```
cd server
venv\Scripts\activate
python server.py
```

- anaconda の仮想環境(venv)上に flask 等をインストールしているので、仮想環境に入った状態で python server.py

### ディレクトリ構造 (server)

```
.
├── README.md
├── client
│   ├── README.md
│   ├── api
│   ├── app
│   ├── components
│   ├── components.json
│   ├── jsconfig.json
│   ├── lib
│   ├── next.config.mjs
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   └── tailwind.config.js
└── server
    ├── Readme.md
    ├── __pycache__     # キャッシュファイルが格納されている
    ├── instance        # DB が格納
    ├── myproject.ini   # uWSGI の設定ファイル（いじらない）
    ├── new_comer.trigger # uWSGI のホットリロード用のファイル（いじる必要なし)
    ├── run             # uWSGI と nginx を接続するソケットが格納されている (いじらない)
    ├── server.py       # サーバー起動エントリポイント（ファイル名を変えるときは教えて）
    ├── test_db.py
    └── venv            # 仮想環境

```
