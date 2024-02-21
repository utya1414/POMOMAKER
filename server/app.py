from flask import Flask, jsonify, request, blueprints
from flask_cors import CORS
from database import init_db

def create_app():
    # Flaskのインスタンスを作成
    app = Flask(__name__)
    CORS(app)

    app.config.from_object('config.DevelopmentConfig')

    init_db(app)

    # modules下のブループリントを呼び出す
    from modules.user_handler import user_handle_app
    from modules.timer_handler import timer_handle_app
    from modules.work_time_handler import work_time_handle_app
    app.register_blueprint(user_handle_app)
    app.register_blueprint(timer_handle_app)
    app.register_blueprint(work_time_handle_app)

    return app

app = create_app()

# 単にHello, World!を返却する
# 引数:なし　返却値:'message': 'Hello, World
@app.route('/', methods=['GET'])
def return_home():
    return jsonify({'message': 'Hello, World!'})

