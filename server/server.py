from flask import Flask, jsonify, request, blueprints
from flask_cors import CORS
from flask_login import LoginManager
from flask_migrate import Migrate
from modules.tables import db, Users

def create_app():

    # Flaskのインスタンスを作成
    app = Flask(__name__)
    CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sample.db'
    # app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://username:password@localhost/dbname'
    # username、password、localhost、dbnameはそれぞれMySQLのユーザー名、パスワード、ホスト名、データベース名に置き換える

    app.secret_key = 'your-secret-key' # セッション管理のための秘密鍵(鬼の直書き)
    
    db.init_app(app)
    migrate = Migrate(app, db)
    with app.app_context():
        db.create_all()

    # セッション管理のための設定
    login_manager = LoginManager()
    login_manager.login_view = '/api/home' # ログイン出来ていない場合はこのURLにリダイレクトされる
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        return Users.query.get(int(user_id))

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
@app.route('/api/home', methods=['GET'])
def return_home():
    return jsonify({'message': 'Hello, World!'})

# サーバーの起動
if __name__ == '__main__':
    app.run(debug=True, port=8080)
