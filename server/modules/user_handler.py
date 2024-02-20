from flask import Blueprint, jsonify, request
from modules.tables import db, Users
from datetime import datetime

user_handle_app = Blueprint('index', __name__) # ブループリントの作成

# 受け取ったユーザ名をユーザー情報テーブルに登録する
# 引数:'user_name'=ユーザ名　返却値:単なる文字列
@user_handle_app.route('/api/user', methods=['POST'])
def insert_user():
    user_data = request.get_json()
    today = datetime.now()
    user = Users(user_name=user_data['user_name'], create_date=today)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User added successfully'})

# 受け取ったユーザ名をユーザー情報テーブルから削除する
# 引数:'user_id'=ユーザID　返却値:単なる文字列
@user_handle_app.route('/api/user', methods=['DELETE'])
def delete_user():
    user_data = request.get_json()
    user = Users.query.filter_by(user_id=user_data['user_id']).first()
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'})

# ユーザー情報テーブルの全データを取得する
# 引数:なし　返却値:'users': user_id, user_name, create_dateのリスト
@user_handle_app.route('/api/user', methods=['GET'])
def get_users():
    users = Users.query.all()
    user_list = []
    for user in users:
        user_list.append({'user_id': user.user_id, 'user_name': user.user_name, 'create_date': user.create_date})
    return jsonify({'users': user_list})
