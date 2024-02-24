from flask import Flask, jsonify, request, blueprints
from flask_cors import CORS
from database import init_db
# from flask_login import LoginManager
from datetime import timedelta
from flask_jwt_extended import JWTManager

from database import db
from flask_migrate import Migrate
from modules.models import Users

def create_app():
    # Flaskのインスタンスを作成
    app = Flask(__name__, instance_relative_config=True)
    CORS(app, supports_credentials=True, responses={r"/*": {"origins": "*"}})

    app.config.from_object('config.DevelopmentConfig')
    
    init_db(app)

    # # セッション管理のための設定
    # login_manager = LoginManager()
    # login_manager.login_view = '/' # ログイン出来ていない場合はこのURLにリダイレクトされる
    # login_manager.init_app(app)

    # @login_manager.user_loader
    # def load_user(user_id):
    #     return Users.query.get(int(user_id))
    
    app.secret_key = 'team-16-api-secret-key'
    app.config.from_mapping(
        SECRET_KEY = "secret"
        ,JWT_SECRET_KEY = "secret"
        ,JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=15)
        ,JWT_REFRESH_TOKEN_EXPIRES = timedelta(hours=24)
        ,JSON_AS_ASCII = False
    )
    jwt = JWTManager(app)

    # マイグレーション機能の設定
    migrate = Migrate(app, db)

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

