from flask import Flask, jsonify, request, blueprints
from flask_cors import CORS
from modules.tables import db, PomodoroTimers

def create_app():
    # Flaskのインスタンスを作成
    app = Flask(__name__)
    CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sample.db'
    # app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://username:password@localhost/dbname'
    # username、password、localhost、dbnameはそれぞれMySQLのユーザー名、パスワード、ホスト名、データベース名に置き換える

    db.init_app(app)

    with app.app_context():
        db.create_all()

    # modules下のブループリントを呼び出す
    from modules.user_handler import user_handle_app
    from modules.timer_handler import timer_handle_app
    app.register_blueprint(user_handle_app)
    app.register_blueprint(timer_handle_app)

    return app

app = create_app()

# 単にHello, World!を返却する
# 引数:なし　返却値:'message': 'Hello, World
@app.route('/api/home', methods=['GET'])
def return_home():
    return jsonify({'message': 'Hello, World!'})

# 受け取ったポモドーロタイマーをポモドーロタイマーテーブルに登録する
# 引数:'title', 'maker_user_id', 'work_length', 'work_music', 'break_length', 'break_music'　返却値:単なる文字列
@app.route('/api/pomodoro_timer', methods=['POST'])
def insert_pomodoro_timer():
    pomodoro_data = request.get_json()
    pomodoro_timer = PomodoroTimers(
        title=pomodoro_data['title'],
        maker_user_id=pomodoro_data['maker_user_id'],
        work_length=pomodoro_data['work_length'],
        work_music=pomodoro_data['work_music'],
        break_length=pomodoro_data['break_length'],
        break_music=pomodoro_data['break_music']
    )
    db.session.add(pomodoro_timer)
    db.session.commit()
    return jsonify({'message': 'Pomodoro Timer added successfully'})

# 受け取ったポモドーロタイマーをポモドーロタイマーテーブルから削除する
# 引数:'pomo_id'=ポモドーロタイマーID　返却値:単なる文字列
@app.route('/api/pomodoro_timer', methods=['DELETE'])
def delete_pomodoro_timer():
    pomodoro_data = request.get_json()
    pomodoro_timer = PomodoroTimers.query.filter_by(pomo_id=pomodoro_data['pomo_id']).first()
    db.session.delete(pomodoro_timer)
    db.session.commit()
    return jsonify({'message': 'Pomodoro Timer deleted successfully'})

# ポモドーロタイマーテーブルの全データを取得する
# 引数:なし　返却値:'pomodoro_timers': pomo_id, title, maker_user_id, work_length, work_music, break_length, break_musicのリスト
@app.route('/api/pomodoro_timer', methods=['GET'])
def get_pomodoro_timers():
    pomodoro_timers = PomodoroTimers.query.all()
    pomodoro_timer_list = []
    for pomodoro_timer in pomodoro_timers:
        pomodoro_timer_list.append({
            'pomo_id': pomodoro_timer.pomo_id,
            'title': pomodoro_timer.title,
            'maker_user_id': pomodoro_timer.maker_user_id,
            'work_length': pomodoro_timer.work_length,
            'work_music': pomodoro_timer.work_music,
            'break_length': pomodoro_timer.break_length,
            'break_music': pomodoro_timer.break_music
        })
    return jsonify({'pomodoro_timers': pomodoro_timer_list})

# ポモドーロタイマーテーブルで指定したユーザーIDのデータを取得する
# 引数:'user_id'=ユーザID　返却値:'pomodoro_timers': pomo_id, title, maker_user_id, work_length, work_music, break_length, break_musicのリスト
@app.route('/api/pomodoro_timer/user', methods=['GET'])
def get_pomodoro_timers_by_user():
    user_id = request.args.get('user_id')
    pomodoro_timers = PomodoroTimers.query.filter_by(maker_user_id=user_id).all()
    pomodoro_timer_list = []
    for pomodoro_timer in pomodoro_timers:
        pomodoro_timer_list.append({
            'pomo_id': pomodoro_timer.pomo_id,
            'title': pomodoro_timer.title,
            'maker_user_id': pomodoro_timer.maker_user_id,
            'work_length': pomodoro_timer.work_length,
            'work_music': pomodoro_timer.work_music,
            'break_length': pomodoro_timer.break_length,
            'break_music': pomodoro_timer.break_music
        })
    return jsonify({'pomodoro_timers': pomodoro_timer_list})

if __name__ == '__main__':
    app.run(debug=True, port=8080)
