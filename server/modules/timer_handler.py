from flask import jsonify
from flask import Blueprint

timer_handle_app = Blueprint('timer', __name__)

# 単にHello, World!を返却する
# 引数:なし　返却値:'message': 'Hello, World
@timer_handle_app.route('/api/timerhandle_aaa', methods=['GET'])
def return_aaa():
    return jsonify({'message': 'aaa'})

@timer_handle_app.route('/api/timerhandle_bbb', methods=['GET'])
def return_bbb():
    return jsonify({'message': 'bbb'})
