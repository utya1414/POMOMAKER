# linuxの場合のvenv仮想環境への入り方
> sudo apt-get install dos2unix
Reading package lists... Done
色々
>> dos2unix venv/Scripts/activate
dos2unix: converting file venv/Scripts/activate to Unix format...
>> source venv/Scripts/activate

# インストールしたpythonライブラリ
pip install flask_sqlalchemy
pip install flask_login
pip install flask_migrate
pip install werkzeug.security
