from flask import jsonify
from flask import Blueprint

user_handle_app = Blueprint('index', __name__)

# 単にHello, World!を返却する
# 引数:なし　返却値:'message': 'Hello, World
@user_handle_app.route('/api/userhandle_aaa', methods=['GET'])
def return_aaa():
    return jsonify({'message': 'aaa'})

@user_handle_app.route('/api/userhandle_bbb', methods=['GET'])
def return_bbb():
    return jsonify({'message': 'bbb'})
