### ssh 接続

---

C:\Users\\{USER_NAME}\\.ssh\config に以下を記載<br>
VS Code の拡張機能 Remote SSH で接続

- config に記載する場合

```
Host remotessh
  HostName X.X.X.X (パブリックIP)
  User ec2-user
  Port 22
  IdentityFile X.pem (Keyのパス)
```

- コマンドパレット上で接続する場合<br>

  EC2 インスタンスの概要を開く<br>
  接続ボタンを押下<br>
  画面下に`ssh -i ~`がある<br>

---

### git 環境構築

---

```
sudo yum install git-all
git clone https://github.com/utya1414/team16.git
```

### Python3, pip のインストール

---

- Python3 をインストール

```
sudo yum -y update
sudo yum install python3
```

- pip をインストール

```
mkdir setup
cd setup
curl -O https://bootstrap.pypa.io/get-pip.py
python3 get-pip.py --user
pip --version
```

### nginx 環境構築

---

- リポジトリ設定ファイルを作成

```
sudo vi /etc/yum.repos.d/nginx.repo
```

- 下記ファイルを記載

```
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/mainline/centos/7/$basearch/
gpgcheck=0
enabled=1
```

- nginx をインストール

```
sudo yum install nginx
```

- nginx を起動

```
sudo service nginx start
```

- nginx を停止

```
sudo nginx -s stop
```

### uWSGI の環境構築

---

- 依存ライブラリをインストール

```
sudo yum groupinstall "Development Tools"
sudo yum install python3-devel
pip install uwsgi
```

### Flask アプリと uWSGI の連携

---

```
cd /team16/server
touch app.ini
```

- app.ini に以下を記述

```
[uwsgi]
# Nginxを使わずにアクセス出来るように一時的にhttpプロトコルを設定
http=0.0.0.0:5000
module=run
callable=application
master=true
processes=5

pj_name=/team16/server

# uwsgi-socketはsocketと指定してもよい
uwsgi-socket=/home/ec2-user/team16/server/run/mywsgi.sock
logto=./log/uwsgi/uwsgi.log
# 後々Nginxがアクセス出来るように666にしている
chmod-socket=666
vacuum=true
die-on-term=true
# wsgi-file=/var/www/myapp/run.py
wsgi-file=/%(pj_name)/run.py
touch-reload=/%(pj_name)/new_comer.trigger

```

- 動作確認 (失敗)

```
uwsgi app.ini
```

### Permission の設定

---

#### ec2-user をサーバー管理者に設定する

- ec2-user のユーザー id や所属するグループ(プライマリーグループもサブグループも)を確認

```
id ec2-user
getent group nginx
```

- ec2-user のサブグループに nginx を追加

```
sudo usermod -aG nginx ec2-user
```

#### ディレクトリの所有者をサーバー管理者に変更する

- 現在のディレクトリの所有者を確認

```
echo $USER
ec2-user
```

- ec2-user になっていない場合「sudo su - ec2-user」でユーザーを切り替える

- 現在のディレクトリ配下全ての所有者を変更

```
sudo chown $USER:nginx -R .
```

- 確認

```
ls -ld .
ls -l .
```

- ログディレクトリに権限を与える (以降ログディレクトリが開けるようになる)

```
sudo chown $USER:nnx -R ./log/uwsgi
ls -ld ./log/uwsgi
```

- 起動 (成功)

```
uwsgi app.ini
```

### uWSGI と nginx の連携

---

- conf ファイルを作成

```

sudo vi /etc/nginx/conf.d/uwsgi.conf

```

- conf ファイルに下記コードを記述

```

server {
listen 80;

    location / {
    include uwsgi_params;
    uwsgi_pass unix:///tmp/uwsgi.sock;
    }

}

```

### 動作確認

```
$ sudo systemctl start nginx
$ sudo systemctl enable nginx
$ cd /var/www/myapp
$ uwsgi --ini myproject.ini

```
