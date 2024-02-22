from flask import Blueprint, jsonify, request
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from modules.tables import db, Users
from datetime import datetime

user_handle_app = Blueprint('index', __name__) # ブループリントの作成

# ユーザー登録、サインアップ機能
# 引数: 'email', 'password', 'user_name'　返却値: 'message': 成功文 or 既存emailエラー文
@user_handle_app.route('/api/signup', methods=['POST'])
def signup_post():
    user_data = request.get_json()
    email = user_data['email']
    password = user_data['password']
    user_name = user_data['user_name']
    created_at = datetime.now()
    print(email, password, user_name, created_at)

    # もしユーザーが既に存在していたらエラーメッセージを返す
    user = Users.query.filter_by(email=email).first()
    if user:
        return jsonify({'message': 'Email address already exists'})

    # ユーザーが存在しなかったら新規ユーザーを作成する（パスワードはハッシュ化して保存）
    new_user = Users(
        email=email,
        user_name=user_name,
        password=generate_password_hash(password, method='pbkdf2:sha256'),
        created_at=created_at
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'New user created!'})

# ログイン機能
# 引数: 'email', 'password', 'remember'　返却値: 'message': 成功文 or emailエラー文 or passwordエラー文
@user_handle_app.route('/api/login', methods=['POST'])
def login_post():
    user_data = request.get_json()
    email = user_data['email']
    password = user_data['password']
    remember = user_data['remember']

    user = Users.query.filter_by(email=email).first()

    if not user:
        return jsonify({'message': 'Email address not found'})
    if not check_password_hash(user.password, password):
        return jsonify({'message': 'Password incorrect'})
        
    login_user(user, remember=remember)
    return jsonify({'message': 'Logged in successfully'})

# ログアウト機能
# 引数: なし　返却値: 'message': 成功文
@user_handle_app.route('/api/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'})

# ログインしていれば、"user_id"を返す
@user_handle_app.route('/api/get_user_id', methods=['GET'])
@login_required
def get_user_id():
    return jsonify({'user_id': current_user.user_id})
