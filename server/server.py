from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# app instance
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sample.db'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://username:password@localhost/dbname'
# username、password、localhost、dbnameはそれぞれMySQLのユーザー名、パスワード、ホスト名、データベース名に置き換える

db = SQLAlchemy(app)

# ユーザー情報テーブルを作成
class User(db.Model):
    uid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_name = db.Column(db.String(30))
    create_day = db.Column(db.String(30))

with app.app_context():
    db.create_all()

# 単にHello, World!を返却する
@app.route('/api/home', methods=['GET'])
def return_home():
    return jsonify({'message': 'Hello, World!'})

# 受け取ったユーザ名をユーザー情報テーブルに登録する
@app.route('/api/insert_user', methods=['POST'])
def insert_user():
    user_data = request.get_json()
    today = datetime.now()
    user = User(user_name=user_data['user_name'], create_day=today)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User added successfully'})

# ユーザー情報テーブルの全データを取得する
@app.route('/api/get_users', methods=['GET'])
def get_users():
    users = User.query.all()
    user_list = []
    for user in users:
        user_list.append({'uid': user.uid, 'user_name': user.user_name, 'create_day': user.create_day})
    return jsonify({'users': user_list})

if __name__ == '__main__':
    app.run(debug=True, port=8080)
