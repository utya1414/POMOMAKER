from flask import Blueprint, jsonify, request
from flask_login import login_user, logout_user, current_user
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
    login_user(new_user, remember=True) # サインアップ成功時はログインもする
    return jsonify({'message': 'User created successfully'})

# ログイン機能
# 引数: 'email', 'password', 'remember'　返却値: 'message': 成功文 or emailエラー文 or passwordエラー文
@user_handle_app.route('/api/login', methods=['POST'])
def login_post():
    user_data = request.get_json()
    email = user_data['email']
    password = user_data['password']

    # email（ユニーク）とpasswordが一致するユーザーが存在するか確認
    user = Users.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message': 'Email address not found'})
    if not check_password_hash(user.password, password):
        return jsonify({'message': 'Password incorrect'})
    
    login_user(user, remember=True) # ブラウザを閉じてもログイン状態を保持する
    return jsonify({'message': 'Logged in successfully'})

# ログアウト機能
# 引数: なし　返却値: 'message': 成功文 or 未ログイン文
@user_handle_app.route('/api/logout', methods=['POST'])
def logout():
    if current_user.is_authenticated:
        logout_user()
        return jsonify({'message': 'Logged out successfully'})
    else:
        return jsonify({'message': 'not logged in'})

# ログインしているユーザにのみ、user情報を返却する
# 引数: なし　返却値: 'user_id', 'email', 'user_name', 'description', 'created_at', 'updated_at'
# (返却値の続き) or 'message': 未ログイン文 or 'message': ユーザ一致無し文
@user_handle_app.route('/api/get_user_info', methods=['GET'])
def get_user_info():
    if current_user.is_authenticated:
        user_id = current_user.user_id
        # ユーザー情報を取得
        user = Users.query.filter_by(user_id=user_id).first()
        if not user:
            return jsonify({'message': 'User not found'})
        return jsonify({
            'user_id': user.user_id,
            'email': user.email,
            # 'password' は返却しない
            'user_name': user.user_name,
            'description': user.description,
            'created_at': user.created_at,
            'updated_at': user.updated_at
        })
    else:
        return jsonify({'message': 'not logged in'})

# user情報を更新する
# 引数: 'email', 'password', 'user_name', 'description'　返却値: 'message': 成功文 or 未ログイン文 
# (返却値の続き) or 必須項目未入力文 or 文字数制限超過文 or ユーザ一致無し文
@user_handle_app.route('/api/update_user_info', methods=['POST'])
def update_user_info():
    if current_user.is_authenticated:
        user_data = request.get_json()
        user_id = current_user.user_id
        email = user_data['email']
        password = user_data['password']
        user_name = user_data['user_name']
        description = user_data['description']
        updated_at = datetime.now()
        
        # nullable=falseの要素がnullだった場合はエラーメッセージを返す
        if email == '' or password == '' or user_name == '':
            return jsonify({'message': 'Please fill in all required fields'})
        # 文字数の制限を超えた場合はエラーメッセージを返す
        if len(email) > 50 or len(password) > 50 or len(user_name) > 50 or len(description) > 200:
            return jsonify({'message': 'string length over'})
        
        # ユーザー情報を取得
        user = Users.query.filter_by(user_id=user_id).first()
        if not user:
            return jsonify({'message': 'User not found'})

        # ユーザー情報を更新
        user.email = email
        user.password = generate_password_hash(password, method='pbkdf2:sha256')
        user.user_name = user_name
        user.description = description
        user.updated_at = updated_at
        db.session.commit()
        return jsonify({'message': 'User info updated successfully'})
    else:
        return jsonify({'message': 'not logged in'})

# ユーザー情報を削除する
# 引数: なし　返却値: 'message': 成功文 or 未ログイン文 or ユーザ一致無し文
@user_handle_app.route('/api/delete_user', methods=['POST'])
def delete_user():
    if current_user.is_authenticated:
        user_id = current_user.user_id
        # ユーザー情報を取得
        user = Users.query.filter_by(user_id=user_id).first()
        if not user:
            return jsonify({'message': 'User not found'})
        db.session.delete(user)
        db.session.commit()
        logout_user() # ユーザー情報を削除したらログアウトもする
        return jsonify({'message': 'User deleted successfully'})
    else:
        return jsonify({'message': 'not logged in'})
