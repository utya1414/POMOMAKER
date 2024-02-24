from imaplib import _Authenticator
from flask import Blueprint, jsonify, request, make_response
from database import db
from modules.models import Users
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

user_handle_app = Blueprint('index', __name__) # ブループリントの作成

# ユーザー登録、サインアップ機能
# 引数: 'email', 'password', 'user_name'　返却値: 'access_token': JWTトークン or 既存emailエラー文
@user_handle_app.route('/api/signup', methods=['GET', 'POST'])
def signup():
    input_data = request.json
    email = input_data.get('email')
    password = input_data.get('password')
    user_name = input_data.get('user_name')
    created_at = datetime.now()
    print("insert_db: ", email, password, user_name, created_at)

    # もし既にemailが存在していたらエラーメッセージを返す
    user = Users.query.filter_by(email=email).first()
    if user:
        return jsonify({
            'status': 'failed',
            'message': 'Email address already exists'
        })
    
    # ユーザーが存在しなかったら新規ユーザーを作成する（パスワードはハッシュ化して保存）
    new_user = Users(
        email=email,
        user_name=user_name,
        password=generate_password_hash(password, method='pbkdf2:sha256'),
        created_at=created_at
    )
    db.session.add(new_user)
    db.session.commit()

    # ユーザーIDを取得
    user_id = new_user.user_id
    # JWTトークンを生成
    access_token = create_access_token(identity=user_id)
    return jsonify({
        'status': 'success',
        'access_token': access_token
    })

# ログイン機能
# 引数: 'email', 'password'　返却値: 'access_token': JWTトークン or emailエラー文 or passwordエラー文
@user_handle_app.route('/api/login', methods=['GET', 'POST'])
def login():
    input_data = request.json
    email = input_data.get('email')
    password = input_data.get('password')

    # email（ユニーク）とpasswordが一致するユーザーが存在するか確認
    user = Users.query.filter_by(email=email).first()
    if not user:
        return jsonify({
            'status': 'failed',
            'message': 'Email address not found'
        })
    if not check_password_hash(user.password, password):
        return jsonify({
            'status': 'failed',
            'message': 'Password incorrect'
        })
    
    # ユーザーIDを取得
    user_id = user.user_id
    # JWTトークンを生成
    access_token = create_access_token(identity=user_id)
    return jsonify({
        'status': 'success',
        'access_token': access_token
    })

# ログアウト機能
# 引数: なし　返却値: 'message': 成功文
@user_handle_app.route('/api/logout', methods=['GET', 'POST'])
@jwt_required()
def logout():
    current_identity = get_jwt_identity()
    if current_identity:
        return jsonify({
            'status': 'success',    
            'message': 'Logged out successfully'
        })
    else:
        return jsonify({
            'status': 'failed',
            'message': 'not logged in'
        })

# ログインしているユーザにのみ、ユーザー情報を返却する
# 引数: なし　返却値: 'user_id', 'email', 'user_name', 'description', 'created_at', 'updated_at'
# (返却値の続き) or 'message': 未ログイン文 or 'message': ユーザ一致無し文
@user_handle_app.route('/api/get_user_info', methods=['GET'])
@jwt_required()
def get_user_info():
    current_identity = get_jwt_identity()
    # ユーザー情報を取得
    user = Users.query.filter_by(user_id=current_identity).first()
    if not user:
        return jsonify({
            'status': 'failed',
            'message': 'User not found'
        })
    
    return jsonify({
        'status': 'success',
        'data': {
            'user_id': user.user_id,
            'email': user.email,
            # 'password' は返却しない
            'user_name': user.user_name,
            'description': user.description,
            'created_at': user.created_at,
            'updated_at': user.updated_at
        }
    })

# ユーザー情報を更新する
# 引数: 'email', 'password', 'user_name', 'description'　返却値: 'message': 成功文 or 未ログイン文
# (返却値の続き) or 必須項目未入力文 or 文字数制限超過文 or ユーザ一致無し文
@user_handle_app.route('/api/update_user_info', methods=['PATCH'])
@jwt_required()
def update_user_info():
    current_identity = get_jwt_identity()
    user_data = request.json
    email = user_data.get('email')
    password = user_data.get('password')
    user_name = user_data.get('user_name')
    description = user_data.get('description')
    updated_at = datetime.now()
    
    # nullable=falseの要素がnullだった場合はエラーメッセージを返す
    if email == '' or password == '' or user_name == '':
        return jsonify({
            'status': 'failed',
            'message': 'Please fill in all required fields'
        })
    # 文字数の制限を超えた場合はエラーメッセージを返す
    if len(email) > 50 or len(password) > 50 or len(user_name) > 50 or len(description) > 200:
        return jsonify({
            'status': 'failed',
            'message': 'string length over'
        })
    
    # 新しく設定しようとしているemailが既存のemailと重複していないか確認
    user = Users.query.filter_by(email=email).first()
    if user and user.user_id != current_identity:
        return jsonify({
            'status': 'failed',
            'message': 'Email address already exists'
        })
    
    # ユーザー情報を取得
    user = Users.query.filter_by(user_id=current_identity).first()
    if not user:
        return jsonify({
            'status': 'failed',
            'message': 'User not found'
        })

    # ユーザー情報を更新
    user.email = email
    user.password = generate_password_hash(password, method='pbkdf2:sha256')
    user.user_name = user_name
    user.description = description
    user.updated_at = updated_at
    db.session.commit()
    return jsonify({
        'status': 'success',
        'message': 'User info updated successfully'
    })

# ユーザー情報を削除する
# 引数: なし　返却値: 'message': 成功文 or 未ログイン文 or ユーザ一致無し文
@user_handle_app.route('/api/delete_user', methods=['DELETE'])
def delete_user():
    current_identity = get_jwt_identity()
    # ユーザー情報を取得
    user = Users.query.filter_by(user_id=current_identity).first()
    if not user:
        return jsonify({
            'status': 'failed',
            'message': 'User not found'
        })
    db.session.delete(user)
    db.session.commit()
    return jsonify({
        'status': 'success',
        'message': 'User deleted successfully'
    })

# ログインしているかをTrue or Falseで返却する
# 引数: なし　返却値: 'logged_in': True or False
@user_handle_app.route('/api/is_logged_in', methods=['GET', 'POST'])
@jwt_required()
def is_logged_in():
    current_identity = get_jwt_identity()
    if current_identity:
        return jsonify({'status': 'success'})
    else:
        return jsonify({'status': 'failed'})
