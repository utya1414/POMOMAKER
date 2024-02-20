- /etc/nginx/conf.d/myapp.conf

```
server {
        listen 80;
        listen [::]:80;
        root /var/www;
        location / {
                    include uwsgi_params;
                    uwsgi_pass unix:///var/www/team16/server/run/mywsgi.sock;
                    }
        }
```

- /var/www/team16/server/myproject.ini

```
[uwsgi]
# Nginxを使わずにアクセス出来るように一時的にhttpプロトコルを設定
; http=0.0.0.0:5000
module=server
callable=app
master=true
processes=5

base_dir=/var/www
pj_name=team16/server

# uwsgi-socketはsocketと指定してもよい
uwsgi-socket=%(base_dir)/%(pj_name)/run/mywsgi.sock
logto=/var/log/uwsgi/uwsgi.log
# 後々Nginxがアクセス出来るように666にしている
chmod-socket=666
vacuum=true
die-on-term=true
# wsgi-file=/var/www/myapp/run.py
wsgi-file=%(base_dir)/%(pj_name)/server.py
touch-reload=%(base_dir)/%(pj_name)/new_comer.trigger
```

- uWSGI の常時起動

```
[Unit]
Description=uWSGI instance to serve myapp
After=network.target

[Service]
User=ec2-user
Group=nginx
WorkingDirectory=/var/www/team16/server
ExecStart=/home/ec2-user/.local/bin/uwsgi --ini myproject.ini
Restart=always
KillSignal=SIGQUIT
Type=notify
NotifyAccess=all

[Install]
WantedBy=multi-user.target

```

- /var/log/uwsgi/uwsgi.log ログファイルのパス
- /var/www/team16/server/new_comer.trigger ホットリロードのトリガーファイル
