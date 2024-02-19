from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# app instance
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sample.db'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://username:password@localhost/dbname'
# username、password、localhost、dbnameはそれぞれMySQLのユーザー名、パスワード、ホスト名、データベース名に置き換える

db = SQLAlchemy(app)

# ユーザー情報クラスを作成
class Users(db.Model):
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_name = db.Column(db.String(30))
    create_date = db.Column(db.String(30))

# ポモドーロタイマー情報クラスを作成
class PomodoroTimers(db.Model):
    pomo_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(30))
    maker_user_id = db.Column(db.Integer)
    work_length = db.Column(db.Integer)
    work_music = db.Column(db.String(30))
    break_length = db.Column(db.Integer)
    break_music = db.Column(db.String(30))

# 作業時間DB

with app.app_context():
    db.create_all()

# 単にHello, World!を返却する
# 引数:なし　返却値:'message': 'Hello, World
@app.route('/api/home', methods=['GET'])
def return_home():
    return jsonify({'message': 'Hello, World!'})

# 受け取ったユーザ名をユーザー情報テーブルに登録する
# 引数:'user_name'=ユーザ名　返却値:単なる文字列
@app.route('/api/user', methods=['POST'])
def insert_user():
    user_data = request.get_json()
    today = datetime.now()
    user = Users(user_name=user_data['user_name'], create_date=today)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User added successfully'})

# 受け取ったユーザ名をユーザー情報テーブルから削除する
# 引数:'user_id'=ユーザID　返却値:単なる文字列
@app.route('/api/user', methods=['DELETE'])
def delete_user():
    user_data = request.get_json()
    user = Users.query.filter_by(user_id=user_data['user_id']).first()
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'})

# ユーザー情報テーブルの全データを取得する
# 引数:なし　返却値:'users': user_id, user_name, create_dateのリスト
@app.route('/api/user', methods=['GET'])
def get_users():
    users = Users.query.all()
    user_list = []
    for user in users:
        user_list.append({'user_id': user.user_id, 'user_name': user.user_name, 'create_date': user.create_date})
    return jsonify({'users': user_list})

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
